import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
app.use(cors());
app.use(express.json());
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error)
        return res.status(400).json({ error: error.message });
    res.json({ message: "User registered", data });
});
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error)
        return res.status(400).json({ error: error.message });
    res.json(data);
});
app.post("/api/save-score", async (req, res) => {
    const { user_id, score } = req.body;
    const { data, error } = await supabase
        .from("scores")
        .insert([{ user_id, score }]);
    if (error)
        return res.status(400).json({ error: error.message });
    res.json({ message: "Score saved!" });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
