import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve request payload parsing
  app.use(express.json({ limit: '10mb' }));

  // API Route FIRST
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "O campo 'prompt' é obrigatório." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "A chave de API do Gemini (GEMINI_API_KEY) não está configurada nos segredos do projeto. Por favor, adicione-a no menu Secrets do AI Studio para habilitar a geração inteligente." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "Você é um consultor administrativo sênior em licitações municipais, estaduais e federais conforme a Lei 14.133/2021.",
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro na API do Gemini:", error);
      res.status(500).json({ 
        error: "Erro ao processar a requisição de IA. Detalhes: " + error.message,
        details: error.message 
      });
    }
  });

  // Serve static check endpoint for app context
  app.get("/api/config", (req, res) => {
    res.json({
      hasKey: !!process.env.GEMINI_API_KEY,
      appUrl: process.env.APP_URL || ""
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
