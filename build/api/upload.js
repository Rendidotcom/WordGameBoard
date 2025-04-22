import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://jmmqpqbpdmaelfnjhgly.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // pakai anon key yang benar
);
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { file, filename } = req.body;
    if (!file || !filename) {
        return res.status(400).json({ error: 'Missing file or filename' });
    }
    const buffer = Buffer.from(file, 'base64');
    const { data, error } = await supabase.storage
        .from('flyers')
        .upload(filename, buffer, {
        contentType: 'image/png',
        upsert: true,
    });
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Uploaded', path: data?.path });
}
