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

## V4 — Simplified Learning Flow
- Hanya 3 menu utama: Home, Belajar, Profil.
- Learning Path dan Learn digabung menjadi menu Belajar.
- Practice tidak lagi menjadi menu utama; latihan muncul langsung setelah materi.
- Review tidak lagi menjadi menu utama; review ditampilkan di dalam alur belajar.
- Today's Study dihapus.
- Hiragana dan Katakana memiliki kuis 50 soal serta latihan tebak huruf random tanpa batas.
- Profil mendukung akun peserta belajar lokal (nama + email) dan menampilkan progres.
- Profil penyusun Muhamad Panji, S.Pd. tetap tersedia.
- Catatan: akun pada versi statis ini disimpan lokal di browser dan belum menggunakan backend/server.

## V5 — Real Login + Cloud Progress (Supabase)

V5 mengganti akun lokal menjadi autentikasi online Supabase:
- Daftar dengan nama, email, dan password.
- Login email + password.
- Dukungan verifikasi email.
- Session tetap tersimpan setelah refresh.
- Logout.
- Progress belajar disimpan per user di tabel `learning_progress`.
- Row Level Security (RLS) memastikan user hanya dapat membaca/mengubah data miliknya sendiri.

### Aktivasi
1. Buat project gratis di Supabase.
2. Buka SQL Editor dan jalankan seluruh isi `supabase-setup.sql`.
3. Ambil Project URL dan Publishable Key di Supabase Dashboard.
4. Edit `config.js`, ganti `YOUR_PROJECT_URL` dan `YOUR_PUBLISHABLE_KEY`.
5. Di Supabase Authentication URL Configuration, isi Site URL dengan URL Vercel Japanese Journey dan tambahkan URL tersebut ke Redirect URLs.
6. Upload semua file ke GitHub. Vercel akan deploy ulang.

PENTING: jangan pernah memasukkan `service_role` key ke source code/browser.

## V5.2 — Expanded Learning Content
Materi diperluas sebelum deployment:
- Kana lengkap untuk basic, dakuten, handakuten, dan yōon pada Hiragana & Katakana.
- Vocabulary: 120 item terstruktur N5–N3.
- Kanji: 60 item dengan arti, onyomi, kunyomi, jumlah goresan, radical, dan contoh.
- Grammar: 30 pola N5–N3 dengan formation, contoh, dan terjemahan.
- Reading: 9 bacaan bertingkat N5–N3.
- Kuis Kana 50 soal dan Endless Random tetap terintegrasi dalam halaman belajar.
- Login Supabase + cloud progress tetap aktif.

Catatan akademik: konten level adalah kurikulum pengembangan terstruktur dan tidak diklaim sebagai daftar resmi JLPT lengkap. Struktur data tetap siap diperluas lagi tanpa mengubah arsitektur aplikasi.

## V5.3 — Progress Dashboard
Navigasi utama sekarang difokuskan menjadi Home, Belajar, dan Progres. Profil/Akun tetap diakses melalui avatar di kanan atas.

Halaman Progres menampilkan:
- streak, XP, akurasi, dan jumlah item yang dikuasai;
- progres Hiragana dan Katakana;
- progres kurikulum N5, N4, dan N3;
- riwayat jawaban, jawaban benar, item yang perlu direview, serta skor kuis;
- rekomendasi untuk kembali ke alur belajar.

Cloud progress Supabase tetap aktif untuk pengguna yang login.
