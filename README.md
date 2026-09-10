# Japanese Journey V3

Platform belajar Bahasa Jepang dari Zero → JLPT N5 → N4 → N3.

## Fitur development build
- Dashboard dengan Continue Learning
- Learning Path
- Hiragana & Katakana
- Kana audio via browser Japanese TTS
- Kana/Kanji writing canvas
- Sample Kanji Library N5–N3
- Sample Vocabulary N5–N3
- Sample Grammar N5–N3
- Listening practice berbasis Japanese TTS
- Reading samples N5–N3
- Quiz engine
- Smart Review
- Mastery score
- XP, streak, progress
- Placement starting-point
- Global search
- Profil penyusun: Muhamad Panji, S.Pd.
- Responsive desktop/mobile
- localStorage persistence

## Penting
Dataset linguistik pada project ini adalah sample/development data, bukan daftar resmi JLPT.
Struktur data dipisahkan di `content.js` agar nantinya mudah diganti dengan dataset terpercaya atau backend/database.

## Deploy ke Vercel
1. Upload seluruh isi folder ke repository GitHub.
2. Vercel → Add New Project.
3. Import repository.
4. Framework preset: Other.
5. Root directory: `./`
6. Build/Output/Install command: kosong.
7. Deploy.

Jika repository sudah terhubung dengan Vercel, cukup replace file lalu commit; Vercel akan redeploy otomatis.


## V3
Profile penyusun diperbarui dengan foto dan identitas singkat: Muhamad Panji, S.Pd., Pendidikan Teknik Mesin, FPTK — Universitas Pendidikan Indonesia.

## V3.1
- Hiragana Quiz dan Katakana Quiz dipisahkan.
- Masing-masing quiz berisi 50 soal acak.
- Endless Random Hiragana dan Katakana: huruf diacak terus sampai pengguna memilih selesai belajar.
- Skor latihan ditampilkan selama sesi.
