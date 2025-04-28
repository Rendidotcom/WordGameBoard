var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
// --- Validasi ENV ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const PORT = Number(process.env.PORT) || 3000;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
    process.exit(1);
}
// --- Inisialisasi Supabase & Express ---
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const app = express();
app.use(cors());
app.use(express.json());
// --- Helper untuk menangani async errors ---
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// --- ROUTES ---
// Register
app.post("/api/register", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email dan password harus diisi" });
    }
    const { data, error } = yield supabase.auth.signUp({ email, password });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res
        .status(201)
        .json({ message: "User registered", data });
})));
// Login
app.post("/api/login", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email dan password harus diisi" });
    }
    const { data, error } = yield supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ message: "User logged in", data });
})));
// Save score
app.post("/api/save-score", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, score } = req.body;
    if (!user_id || typeof score !== "number") {
        return res
            .status(400)
            .json({ error: "user_id dan numeric score harus diisi" });
    }
    const { data, error } = yield supabase
        .from("scores")
        .insert([{ user_id, score }]);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res
        .status(201)
        .json({ message: "Score saved", data });
})));
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
});
// Mulai server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
