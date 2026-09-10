// Japanese Journey V5.5 — self-contained browser bundle.
// Dibuat tanpa ES-module imports agar deployment statis di Vercel lebih tahan gagal.

// Japanese Journey — Supabase public browser configuration.
// Publishable key aman digunakan di frontend selama RLS aktif.
// Jangan pernah menaruh secret/service_role key di file ini.

const SUPABASE_URL = "https://dusjgvqtlycmbzbwyufg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iR3rxuFJ5w69Cmi-4oMo4Q_yVL75y0F";


// Japanese Journey V5.2 — curated development curriculum.
// Catatan: JLPT tidak menyediakan daftar kosakata/kanji resmi lengkap per level; data ini adalah kurikulum pengembangan terstruktur, bukan klaim daftar resmi JLPT.
const parseKana=(type,group,s)=>s.split(',').map(x=>{const [character,romaji]=x.split(':');return {type,group,character,romaji}});
const kana = [
  ...parseKana("hiragana","basic","あ:a,い:i,う:u,え:e,お:o,か:ka,き:ki,く:ku,け:ke,こ:ko,さ:sa,し:shi,す:su,せ:se,そ:so,た:ta,ち:chi,つ:tsu,て:te,と:to,な:na,に:ni,ぬ:nu,ね:ne,の:no,は:ha,ひ:hi,ふ:fu,へ:he,ほ:ho,ま:ma,み:mi,む:mu,め:me,も:mo,や:ya,ゆ:yu,よ:yo,ら:ra,り:ri,る:ru,れ:re,ろ:ro,わ:wa,を:wo,ん:n"),
  ...parseKana("hiragana","dakuten","が:ga,ぎ:gi,ぐ:gu,げ:ge,ご:go,ざ:za,じ:ji,ず:zu,ぜ:ze,ぞ:zo,だ:da,ぢ:ji,づ:zu,で:de,ど:do,ば:ba,び:bi,ぶ:bu,べ:be,ぼ:bo"),
  ...parseKana("hiragana","handakuten","ぱ:pa,ぴ:pi,ぷ:pu,ぺ:pe,ぽ:po"),
  ...parseKana("hiragana","yoon","きゃ:kya,きゅ:kyu,きょ:kyo,しゃ:sha,しゅ:shu,しょ:sho,ちゃ:cha,ちゅ:chu,ちょ:cho,にゃ:nya,にゅ:nyu,にょ:nyo,ひゃ:hya,ひゅ:hyu,ひょ:hyo,みゃ:mya,みゅ:myu,みょ:myo,りゃ:rya,りゅ:ryu,りょ:ryo,ぎゃ:gya,ぎゅ:gyu,ぎょ:gyo,じゃ:ja,じゅ:ju,じょ:jo,びゃ:bya,びゅ:byu,びょ:byo,ぴゃ:pya,ぴゅ:pyu,ぴょ:pyo"),
  ...parseKana("katakana","basic","ア:a,イ:i,ウ:u,エ:e,オ:o,カ:ka,キ:ki,ク:ku,ケ:ke,コ:ko,サ:sa,シ:shi,ス:su,セ:se,ソ:so,タ:ta,チ:chi,ツ:tsu,テ:te,ト:to,ナ:na,ニ:ni,ヌ:nu,ネ:ne,ノ:no,ハ:ha,ヒ:hi,フ:fu,ヘ:he,ホ:ho,マ:ma,ミ:mi,ム:mu,メ:me,モ:mo,ヤ:ya,ユ:yu,ヨ:yo,ラ:ra,リ:ri,ル:ru,レ:re,ロ:ro,ワ:wa,ヲ:wo,ン:n"),
  ...parseKana("katakana","dakuten","ガ:ga,ギ:gi,グ:gu,ゲ:ge,ゴ:go,ザ:za,ジ:ji,ズ:zu,ゼ:ze,ゾ:zo,ダ:da,ヂ:ji,ヅ:zu,デ:de,ド:do,バ:ba,ビ:bi,ブ:bu,ベ:be,ボ:bo"),
  ...parseKana("katakana","handakuten","パ:pa,ピ:pi,プ:pu,ペ:pe,ポ:po"),
  ...parseKana("katakana","yoon","キャ:kya,キュ:kyu,キョ:kyo,シャ:sha,シュ:shu,ショ:sho,チャ:cha,チュ:chu,チョ:cho,ニャ:nya,ニュ:nyu,ニョ:nyo,ヒャ:hya,ヒュ:hyu,ヒョ:hyo,ミャ:mya,ミュ:myu,ミョ:myo,リャ:rya,リュ:ryu,リョ:ryo,ギャ:gya,ギュ:gyu,ギョ:gyo,ジャ:ja,ジュ:ju,ジョ:jo,ビャ:bya,ビュ:byu,ビョ:byo,ピャ:pya,ピュ:pyu,ピョ:pyo"),
];

const vocab = [
  {"word":"私","reading":"わたし","romaji":"watashi","meaning":"saya","level":"N5","category":"People"},
  {"word":"あなた","reading":"あなた","romaji":"anata","meaning":"kamu / Anda","level":"N5","category":"People"},
  {"word":"人","reading":"ひと","romaji":"hito","meaning":"orang","level":"N5","category":"People"},
  {"word":"友達","reading":"ともだち","romaji":"tomodachi","meaning":"teman","level":"N5","category":"People"},
  {"word":"家族","reading":"かぞく","romaji":"kazoku","meaning":"keluarga","level":"N5","category":"People"},
  {"word":"先生","reading":"せんせい","romaji":"sensei","meaning":"guru","level":"N5","category":"School"},
  {"word":"学生","reading":"がくせい","romaji":"gakusei","meaning":"pelajar / mahasiswa","level":"N5","category":"School"},
  {"word":"学校","reading":"がっこう","romaji":"gakkou","meaning":"sekolah","level":"N5","category":"School"},
  {"word":"大学","reading":"だいがく","romaji":"daigaku","meaning":"universitas","level":"N5","category":"School"},
  {"word":"本","reading":"ほん","romaji":"hon","meaning":"buku","level":"N5","category":"School"},
  {"word":"日本","reading":"にほん","romaji":"nihon","meaning":"Jepang","level":"N5","category":"Places"},
  {"word":"国","reading":"くに","romaji":"kuni","meaning":"negara","level":"N5","category":"Places"},
  {"word":"家","reading":"いえ","romaji":"ie","meaning":"rumah","level":"N5","category":"Places"},
  {"word":"駅","reading":"えき","romaji":"eki","meaning":"stasiun","level":"N5","category":"Transportation"},
  {"word":"電車","reading":"でんしゃ","romaji":"densha","meaning":"kereta","level":"N5","category":"Transportation"},
  {"word":"車","reading":"くるま","romaji":"kuruma","meaning":"mobil","level":"N5","category":"Transportation"},
  {"word":"今日","reading":"きょう","romaji":"kyou","meaning":"hari ini","level":"N5","category":"Time"},
  {"word":"明日","reading":"あした","romaji":"ashita","meaning":"besok","level":"N5","category":"Time"},
  {"word":"昨日","reading":"きのう","romaji":"kinou","meaning":"kemarin","level":"N5","category":"Time"},
  {"word":"朝","reading":"あさ","romaji":"asa","meaning":"pagi","level":"N5","category":"Time"},
  {"word":"昼","reading":"ひる","romaji":"hiru","meaning":"siang","level":"N5","category":"Time"},
  {"word":"夜","reading":"よる","romaji":"yoru","meaning":"malam","level":"N5","category":"Time"},
  {"word":"時間","reading":"じかん","romaji":"jikan","meaning":"waktu / jam","level":"N5","category":"Time"},
  {"word":"水","reading":"みず","romaji":"mizu","meaning":"air","level":"N5","category":"Food"},
  {"word":"ご飯","reading":"ごはん","romaji":"gohan","meaning":"nasi / makanan","level":"N5","category":"Food"},
  {"word":"食べる","reading":"たべる","romaji":"taberu","meaning":"makan","level":"N5","category":"Daily Life"},
  {"word":"飲む","reading":"のむ","romaji":"nomu","meaning":"minum","level":"N5","category":"Daily Life"},
  {"word":"見る","reading":"みる","romaji":"miru","meaning":"melihat","level":"N5","category":"Daily Life"},
  {"word":"聞く","reading":"きく","romaji":"kiku","meaning":"mendengar / bertanya","level":"N5","category":"Daily Life"},
  {"word":"読む","reading":"よむ","romaji":"yomu","meaning":"membaca","level":"N5","category":"Daily Life"},
  {"word":"書く","reading":"かく","romaji":"kaku","meaning":"menulis","level":"N5","category":"Daily Life"},
  {"word":"話す","reading":"はなす","romaji":"hanasu","meaning":"berbicara","level":"N5","category":"Daily Life"},
  {"word":"行く","reading":"いく","romaji":"iku","meaning":"pergi","level":"N5","category":"Travel"},
  {"word":"来る","reading":"くる","romaji":"kuru","meaning":"datang","level":"N5","category":"Travel"},
  {"word":"帰る","reading":"かえる","romaji":"kaeru","meaning":"pulang","level":"N5","category":"Travel"},
  {"word":"買う","reading":"かう","romaji":"kau","meaning":"membeli","level":"N5","category":"Shopping"},
  {"word":"大きい","reading":"おおきい","romaji":"ookii","meaning":"besar","level":"N5","category":"Adjective"},
  {"word":"小さい","reading":"ちいさい","romaji":"chiisai","meaning":"kecil","level":"N5","category":"Adjective"},
  {"word":"新しい","reading":"あたらしい","romaji":"atarashii","meaning":"baru","level":"N5","category":"Adjective"},
  {"word":"古い","reading":"ふるい","romaji":"furui","meaning":"lama / tua (benda)","level":"N5","category":"Adjective"},
  {"word":"必要","reading":"ひつよう","romaji":"hitsuyou","meaning":"perlu / diperlukan","level":"N4","category":"Daily Life"},
  {"word":"準備","reading":"じゅんび","romaji":"junbi","meaning":"persiapan","level":"N4","category":"Activities"},
  {"word":"予定","reading":"よてい","romaji":"yotei","meaning":"rencana / jadwal","level":"N4","category":"Time"},
  {"word":"最近","reading":"さいきん","romaji":"saikin","meaning":"akhir-akhir ini","level":"N4","category":"Time"},
  {"word":"経験","reading":"けいけん","romaji":"keiken","meaning":"pengalaman","level":"N4","category":"Work"},
  {"word":"説明","reading":"せつめい","romaji":"setsumei","meaning":"penjelasan","level":"N4","category":"School"},
  {"word":"練習","reading":"れんしゅう","romaji":"renshuu","meaning":"latihan","level":"N4","category":"School"},
  {"word":"質問","reading":"しつもん","romaji":"shitsumon","meaning":"pertanyaan","level":"N4","category":"School"},
  {"word":"答え","reading":"こたえ","romaji":"kotae","meaning":"jawaban","level":"N4","category":"School"},
  {"word":"試験","reading":"しけん","romaji":"shiken","meaning":"ujian","level":"N4","category":"School"},
  {"word":"仕事","reading":"しごと","romaji":"shigoto","meaning":"pekerjaan","level":"N4","category":"Work"},
  {"word":"会社","reading":"かいしゃ","romaji":"kaisha","meaning":"perusahaan","level":"N4","category":"Work"},
  {"word":"工場","reading":"こうじょう","romaji":"koujou","meaning":"pabrik","level":"N4","category":"Work"},
  {"word":"働く","reading":"はたらく","romaji":"hataraku","meaning":"bekerja","level":"N4","category":"Work"},
  {"word":"始める","reading":"はじめる","romaji":"hajimeru","meaning":"memulai","level":"N4","category":"Activities"},
  {"word":"続ける","reading":"つづける","romaji":"tsuzukeru","meaning":"melanjutkan","level":"N4","category":"Activities"},
  {"word":"終わる","reading":"おわる","romaji":"owaru","meaning":"selesai / berakhir","level":"N4","category":"Activities"},
  {"word":"決める","reading":"きめる","romaji":"kimeru","meaning":"memutuskan","level":"N4","category":"Activities"},
  {"word":"調べる","reading":"しらべる","romaji":"shiraberu","meaning":"mencari tahu / memeriksa","level":"N4","category":"Activities"},
  {"word":"手伝う","reading":"てつだう","romaji":"tetsudau","meaning":"membantu","level":"N4","category":"Activities"},
  {"word":"使う","reading":"つかう","romaji":"tsukau","meaning":"menggunakan","level":"N4","category":"Daily Life"},
  {"word":"作る","reading":"つくる","romaji":"tsukuru","meaning":"membuat","level":"N4","category":"Daily Life"},
  {"word":"持つ","reading":"もつ","romaji":"motsu","meaning":"membawa / memiliki","level":"N4","category":"Daily Life"},
  {"word":"待つ","reading":"まつ","romaji":"matsu","meaning":"menunggu","level":"N4","category":"Daily Life"},
  {"word":"急ぐ","reading":"いそぐ","romaji":"isogu","meaning":"bergegas","level":"N4","category":"Daily Life"},
  {"word":"間に合う","reading":"まにあう","romaji":"maniau","meaning":"tepat waktu","level":"N4","category":"Time"},
  {"word":"心配","reading":"しんぱい","romaji":"shinpai","meaning":"khawatir","level":"N4","category":"Feelings"},
  {"word":"安心","reading":"あんしん","romaji":"anshin","meaning":"lega / tenang","level":"N4","category":"Feelings"},
  {"word":"残念","reading":"ざんねん","romaji":"zannen","meaning":"sayang / disesalkan","level":"N4","category":"Feelings"},
  {"word":"便利","reading":"べんり","romaji":"benri","meaning":"praktis / nyaman","level":"N4","category":"Adjective"},
  {"word":"不便","reading":"ふべん","romaji":"fuben","meaning":"tidak praktis","level":"N4","category":"Adjective"},
  {"word":"安全","reading":"あんぜん","romaji":"anzen","meaning":"aman","level":"N4","category":"Safety"},
  {"word":"危険","reading":"きけん","romaji":"kiken","meaning":"berbahaya","level":"N4","category":"Safety"},
  {"word":"交通","reading":"こうつう","romaji":"koutsuu","meaning":"lalu lintas / transportasi","level":"N4","category":"Transportation"},
  {"word":"旅行","reading":"りょこう","romaji":"ryokou","meaning":"perjalanan / wisata","level":"N4","category":"Travel"},
  {"word":"予約","reading":"よやく","romaji":"yoyaku","meaning":"reservasi","level":"N4","category":"Travel"},
  {"word":"場所","reading":"ばしょ","romaji":"basho","meaning":"tempat","level":"N4","category":"Places"},
  {"word":"文化","reading":"ぶんか","romaji":"bunka","meaning":"budaya","level":"N4","category":"Society"},
  {"word":"生活","reading":"せいかつ","romaji":"seikatsu","meaning":"kehidupan sehari-hari","level":"N4","category":"Daily Life"},
  {"word":"習慣","reading":"しゅうかん","romaji":"shuukan","meaning":"kebiasaan","level":"N4","category":"Daily Life"},
  {"word":"技術","reading":"ぎじゅつ","romaji":"gijutsu","meaning":"teknologi / keterampilan teknis","level":"N3","category":"Technology"},
  {"word":"環境","reading":"かんきょう","romaji":"kankyou","meaning":"lingkungan","level":"N3","category":"Society"},
  {"word":"影響","reading":"えいきょう","romaji":"eikyou","meaning":"pengaruh / dampak","level":"N3","category":"Society"},
  {"word":"関係","reading":"かんけい","romaji":"kankei","meaning":"hubungan / relasi","level":"N3","category":"Society"},
  {"word":"改善","reading":"かいぜん","romaji":"kaizen","meaning":"perbaikan","level":"N3","category":"Work"},
  {"word":"生産","reading":"せいさん","romaji":"seisan","meaning":"produksi","level":"N3","category":"Work"},
  {"word":"品質","reading":"ひんしつ","romaji":"hinshitsu","meaning":"kualitas","level":"N3","category":"Work"},
  {"word":"管理","reading":"かんり","romaji":"kanri","meaning":"pengelolaan / manajemen","level":"N3","category":"Work"},
  {"word":"作業","reading":"さぎょう","romaji":"sagyou","meaning":"pekerjaan / operasi kerja","level":"N3","category":"Work"},
  {"word":"設備","reading":"せつび","romaji":"setsubi","meaning":"peralatan / fasilitas","level":"N3","category":"Work"},
  {"word":"確認","reading":"かくにん","romaji":"kakunin","meaning":"konfirmasi / pemeriksaan","level":"N3","category":"Work"},
  {"word":"報告","reading":"ほうこく","romaji":"houkoku","meaning":"laporan / melapor","level":"N3","category":"Work"},
  {"word":"連絡","reading":"れんらく","romaji":"renraku","meaning":"menghubungi / kontak","level":"N3","category":"Work"},
  {"word":"相談","reading":"そうだん","romaji":"soudan","meaning":"konsultasi / berdiskusi","level":"N3","category":"Work"},
  {"word":"対応","reading":"たいおう","romaji":"taiou","meaning":"penanganan / respons","level":"N3","category":"Work"},
  {"word":"原因","reading":"げんいん","romaji":"genin","meaning":"penyebab","level":"N3","category":"Reasoning"},
  {"word":"結果","reading":"けっか","romaji":"kekka","meaning":"hasil","level":"N3","category":"Reasoning"},
  {"word":"方法","reading":"ほうほう","romaji":"houhou","meaning":"cara / metode","level":"N3","category":"Reasoning"},
  {"word":"目的","reading":"もくてき","romaji":"mokuteki","meaning":"tujuan","level":"N3","category":"Reasoning"},
  {"word":"条件","reading":"じょうけん","romaji":"jouken","meaning":"syarat / kondisi","level":"N3","category":"Reasoning"},
  {"word":"場合","reading":"ばあい","romaji":"baai","meaning":"kasus / keadaan","level":"N3","category":"Reasoning"},
  {"word":"状況","reading":"じょうきょう","romaji":"joukyou","meaning":"situasi / kondisi","level":"N3","category":"Society"},
  {"word":"内容","reading":"ないよう","romaji":"naiyou","meaning":"isi / konten","level":"N3","category":"General"},
  {"word":"情報","reading":"じょうほう","romaji":"jouhou","meaning":"informasi","level":"N3","category":"Technology"},
  {"word":"資料","reading":"しりょう","romaji":"shiryou","meaning":"dokumen / materi referensi","level":"N3","category":"School"},
  {"word":"知識","reading":"ちしき","romaji":"chishiki","meaning":"pengetahuan","level":"N3","category":"School"},
  {"word":"能力","reading":"のうりょく","romaji":"nouryoku","meaning":"kemampuan","level":"N3","category":"General"},
  {"word":"努力","reading":"どりょく","romaji":"doryoku","meaning":"usaha","level":"N3","category":"General"},
  {"word":"成長","reading":"せいちょう","romaji":"seichou","meaning":"pertumbuhan / perkembangan","level":"N3","category":"General"},
  {"word":"成功","reading":"せいこう","romaji":"seikou","meaning":"keberhasilan","level":"N3","category":"General"},
  {"word":"失敗","reading":"しっぱい","romaji":"shippai","meaning":"kegagalan / kesalahan","level":"N3","category":"General"},
  {"word":"選択","reading":"せんたく","romaji":"sentaku","meaning":"pilihan / pemilihan","level":"N3","category":"General"},
  {"word":"判断","reading":"はんだん","romaji":"handan","meaning":"penilaian / keputusan","level":"N3","category":"Reasoning"},
  {"word":"必要性","reading":"ひつようせい","romaji":"hitsuyousei","meaning":"kebutuhan / pentingnya","level":"N3","category":"Reasoning"},
  {"word":"増加","reading":"ぞうか","romaji":"zouka","meaning":"peningkatan","level":"N3","category":"Society"},
  {"word":"減少","reading":"げんしょう","romaji":"genshou","meaning":"penurunan","level":"N3","category":"Society"},
  {"word":"変化","reading":"へんか","romaji":"henka","meaning":"perubahan","level":"N3","category":"General"},
  {"word":"比較","reading":"ひかく","romaji":"hikaku","meaning":"perbandingan","level":"N3","category":"Reasoning"},
  {"word":"一般","reading":"いっぱん","romaji":"ippan","meaning":"umum","level":"N3","category":"General"},
  {"word":"具体的","reading":"ぐたいてき","romaji":"gutaiteki","meaning":"konkret / spesifik","level":"N3","category":"Reasoning"},
];

const kanji = [
  {"k":"日","meaning":"hari / matahari","on":"ニチ・ジツ","kun":"ひ・か","strokes":4,"radical":"日","level":"N5","examples":["日本","今日"]},
  {"k":"月","meaning":"bulan / bulan langit","on":"ゲツ・ガツ","kun":"つき","strokes":4,"radical":"月","level":"N5","examples":["月曜日","今月"]},
  {"k":"火","meaning":"api","on":"カ","kun":"ひ","strokes":4,"radical":"火","level":"N5","examples":["火曜日","火"]},
  {"k":"水","meaning":"air","on":"スイ","kun":"みず","strokes":4,"radical":"水","level":"N5","examples":["水曜日","水"]},
  {"k":"木","meaning":"pohon / kayu","on":"モク・ボク","kun":"き","strokes":4,"radical":"木","level":"N5","examples":["木曜日","木"]},
  {"k":"金","meaning":"emas / uang","on":"キン・コン","kun":"かね","strokes":8,"radical":"金","level":"N5","examples":["金曜日","お金"]},
  {"k":"土","meaning":"tanah","on":"ド・ト","kun":"つち","strokes":3,"radical":"土","level":"N5","examples":["土曜日","土地"]},
  {"k":"人","meaning":"orang","on":"ジン・ニン","kun":"ひと","strokes":2,"radical":"人","level":"N5","examples":["日本人","人"]},
  {"k":"本","meaning":"buku / asal","on":"ホン","kun":"もと","strokes":5,"radical":"木","level":"N5","examples":["日本","本"]},
  {"k":"学","meaning":"belajar","on":"ガク","kun":"まなぶ","strokes":8,"radical":"子","level":"N5","examples":["学生","学校"]},
  {"k":"校","meaning":"sekolah","on":"コウ","kun":"—","strokes":10,"radical":"木","level":"N5","examples":["学校"]},
  {"k":"先","meaning":"lebih dulu / sebelumnya","on":"セン","kun":"さき","strokes":6,"radical":"儿","level":"N5","examples":["先生","先"]},
  {"k":"生","meaning":"hidup / lahir","on":"セイ・ショウ","kun":"いきる・うまれる","strokes":5,"radical":"生","level":"N5","examples":["先生","学生"]},
  {"k":"食","meaning":"makan / makanan","on":"ショク","kun":"たべる","strokes":9,"radical":"食","level":"N5","examples":["食べる","食事"]},
  {"k":"飲","meaning":"minum","on":"イン","kun":"のむ","strokes":12,"radical":"食","level":"N5","examples":["飲む","飲み物"]},
  {"k":"見","meaning":"melihat","on":"ケン","kun":"みる","strokes":7,"radical":"見","level":"N5","examples":["見る","見学"]},
  {"k":"行","meaning":"pergi / menjalankan","on":"コウ・ギョウ","kun":"いく・おこなう","strokes":6,"radical":"行","level":"N5","examples":["行く","銀行"]},
  {"k":"来","meaning":"datang","on":"ライ","kun":"くる","strokes":7,"radical":"木","level":"N5","examples":["来る","来年"]},
  {"k":"車","meaning":"kendaraan / mobil","on":"シャ","kun":"くるま","strokes":7,"radical":"車","level":"N5","examples":["電車","車"]},
  {"k":"電","meaning":"listrik","on":"デン","kun":"—","strokes":13,"radical":"雨","level":"N5","examples":["電車","電話"]},
  {"k":"会","meaning":"bertemu / perkumpulan","on":"カイ","kun":"あう","strokes":6,"radical":"人","level":"N4","examples":["会社","会う"]},
  {"k":"社","meaning":"perusahaan / kuil","on":"シャ","kun":"やしろ","strokes":7,"radical":"示","level":"N4","examples":["会社","神社"]},
  {"k":"仕","meaning":"melayani / melakukan","on":"シ・ジ","kun":"つかえる","strokes":5,"radical":"人","level":"N4","examples":["仕事"]},
  {"k":"事","meaning":"hal / urusan","on":"ジ・ズ","kun":"こと","strokes":8,"radical":"亅","level":"N4","examples":["仕事","食事"]},
  {"k":"工","meaning":"kerja / teknik","on":"コウ・ク","kun":"—","strokes":3,"radical":"工","level":"N4","examples":["工場","工業"]},
  {"k":"場","meaning":"tempat","on":"ジョウ","kun":"ば","strokes":12,"radical":"土","level":"N4","examples":["工場","場所"]},
  {"k":"作","meaning":"membuat","on":"サク・サ","kun":"つくる","strokes":7,"radical":"人","level":"N4","examples":["作る","作業"]},
  {"k":"使","meaning":"menggunakan","on":"シ","kun":"つかう","strokes":8,"radical":"人","level":"N4","examples":["使う"]},
  {"k":"始","meaning":"memulai","on":"シ","kun":"はじめる・はじまる","strokes":8,"radical":"女","level":"N4","examples":["始める","開始"]},
  {"k":"終","meaning":"akhir / selesai","on":"シュウ","kun":"おわる","strokes":11,"radical":"糸","level":"N4","examples":["終わる","終了"]},
  {"k":"決","meaning":"memutuskan","on":"ケツ","kun":"きめる","strokes":7,"radical":"水","level":"N4","examples":["決める","決定"]},
  {"k":"予","meaning":"sebelumnya / rencana","on":"ヨ","kun":"—","strokes":4,"radical":"亅","level":"N4","examples":["予定","予約"]},
  {"k":"定","meaning":"menetapkan","on":"テイ・ジョウ","kun":"さだめる","strokes":8,"radical":"宀","level":"N4","examples":["予定","決定"]},
  {"k":"安","meaning":"aman / murah","on":"アン","kun":"やすい","strokes":6,"radical":"宀","level":"N4","examples":["安全","安心"]},
  {"k":"全","meaning":"seluruh / lengkap","on":"ゼン","kun":"まったく","strokes":6,"radical":"入","level":"N4","examples":["安全","全部"]},
  {"k":"危","meaning":"bahaya","on":"キ","kun":"あぶない","strokes":6,"radical":"卩","level":"N4","examples":["危険"]},
  {"k":"険","meaning":"curam / berbahaya","on":"ケン","kun":"けわしい","strokes":11,"radical":"阜","level":"N4","examples":["危険"]},
  {"k":"文","meaning":"tulisan / budaya","on":"ブン・モン","kun":"ふみ","strokes":4,"radical":"文","level":"N4","examples":["文化","文章"]},
  {"k":"化","meaning":"perubahan","on":"カ・ケ","kun":"ばける","strokes":4,"radical":"匕","level":"N4","examples":["文化","変化"]},
  {"k":"験","meaning":"uji / pengalaman","on":"ケン・ゲン","kun":"—","strokes":18,"radical":"馬","level":"N4","examples":["経験","試験"]},
  {"k":"技","meaning":"teknik / keterampilan","on":"ギ","kun":"わざ","strokes":7,"radical":"手","level":"N3","examples":["技術"]},
  {"k":"術","meaning":"teknik / seni","on":"ジュツ","kun":"すべ","strokes":11,"radical":"行","level":"N3","examples":["技術"]},
  {"k":"環","meaning":"lingkar / lingkungan","on":"カン","kun":"—","strokes":17,"radical":"玉","level":"N3","examples":["環境"]},
  {"k":"境","meaning":"batas / keadaan","on":"キョウ・ケイ","kun":"さかい","strokes":14,"radical":"土","level":"N3","examples":["環境"]},
  {"k":"影","meaning":"bayangan / pengaruh","on":"エイ","kun":"かげ","strokes":15,"radical":"彡","level":"N3","examples":["影響"]},
  {"k":"響","meaning":"gema / pengaruh","on":"キョウ","kun":"ひびく","strokes":20,"radical":"音","level":"N3","examples":["影響"]},
  {"k":"関","meaning":"hubungan / gerbang","on":"カン","kun":"せき","strokes":14,"radical":"門","level":"N3","examples":["関係"]},
  {"k":"係","meaning":"hubungan / petugas","on":"ケイ","kun":"かかる・かかり","strokes":9,"radical":"人","level":"N3","examples":["関係","係員"]},
  {"k":"改","meaning":"memperbaiki","on":"カイ","kun":"あらためる","strokes":7,"radical":"攵","level":"N3","examples":["改善"]},
  {"k":"善","meaning":"baik / kebaikan","on":"ゼン","kun":"よい","strokes":12,"radical":"口","level":"N3","examples":["改善"]},
  {"k":"生","meaning":"hidup / menghasilkan","on":"セイ・ショウ","kun":"いきる・うむ","strokes":5,"radical":"生","level":"N3","examples":["生産"]},
  {"k":"産","meaning":"produksi / melahirkan","on":"サン","kun":"うむ","strokes":11,"radical":"生","level":"N3","examples":["生産"]},
  {"k":"品","meaning":"barang / kualitas","on":"ヒン","kun":"しな","strokes":9,"radical":"口","level":"N3","examples":["品質"]},
  {"k":"質","meaning":"kualitas / sifat","on":"シツ・シチ","kun":"たち","strokes":15,"radical":"貝","level":"N3","examples":["品質","質問"]},
  {"k":"管","meaning":"pipa / mengelola","on":"カン","kun":"くだ","strokes":14,"radical":"竹","level":"N3","examples":["管理"]},
  {"k":"理","meaning":"alasan / mengatur","on":"リ","kun":"—","strokes":11,"radical":"玉","level":"N3","examples":["管理","理由"]},
  {"k":"報","meaning":"laporan / balasan","on":"ホウ","kun":"むくいる","strokes":12,"radical":"土","level":"N3","examples":["報告"]},
  {"k":"告","meaning":"memberi tahu","on":"コク","kun":"つげる","strokes":7,"radical":"口","level":"N3","examples":["報告"]},
  {"k":"確","meaning":"pasti / memastikan","on":"カク","kun":"たしか","strokes":15,"radical":"石","level":"N3","examples":["確認"]},
  {"k":"認","meaning":"mengakui / mengenali","on":"ニン","kun":"みとめる","strokes":14,"radical":"言","level":"N3","examples":["確認","認識"]},
];

const grammar = [
  {"pattern":"です","meaning":"adalah / bentuk sopan","level":"N5","formation":"Noun / な-adjective + です","example":"私は学生です。","translation":"Saya adalah pelajar."},
  {"pattern":"ます","meaning":"akhiran sopan untuk kata kerja","level":"N5","formation":"Verb stem + ます","example":"毎日日本語を勉強します。","translation":"Saya belajar bahasa Jepang setiap hari."},
  {"pattern":"は","meaning":"penanda topik","level":"N5","formation":"Topic + は + informasi","example":"私はインドネシア人です。","translation":"Saya orang Indonesia."},
  {"pattern":"が","meaning":"penanda subjek / fokus","level":"N5","formation":"Subject + が + predicate","example":"猫がいます。","translation":"Ada kucing."},
  {"pattern":"を","meaning":"penanda objek langsung","level":"N5","formation":"Object + を + Verb","example":"パンを食べます。","translation":"Saya makan roti."},
  {"pattern":"に","meaning":"waktu / tujuan / lokasi keberadaan","level":"N5","formation":"Time/Destination + に","example":"七時に起きます。","translation":"Saya bangun pukul tujuh."},
  {"pattern":"で","meaning":"tempat terjadinya aktivitas / alat","level":"N5","formation":"Place/Means + で + Verb","example":"学校で勉強します。","translation":"Saya belajar di sekolah."},
  {"pattern":"へ","meaning":"arah tujuan","level":"N5","formation":"Destination + へ + movement verb","example":"日本へ行きます。","translation":"Saya pergi ke Jepang."},
  {"pattern":"から・まで","meaning":"dari ... sampai ...","level":"N5","formation":"A + から + B + まで","example":"九時から五時まで働きます。","translation":"Saya bekerja dari jam sembilan sampai jam lima."},
  {"pattern":"～たい","meaning":"ingin melakukan","level":"N5","formation":"Verb ます-stem + たい","example":"日本へ行きたいです。","translation":"Saya ingin pergi ke Jepang."},
  {"pattern":"～ながら","meaning":"sambil melakukan","level":"N4","formation":"Verb ます-stem + ながら","example":"音楽を聞きながら勉強します。","translation":"Belajar sambil mendengarkan musik."},
  {"pattern":"～そうです","meaning":"kelihatannya / tampaknya","level":"N4","formation":"Stem / adjective + そうです","example":"この料理はおいしそうです。","translation":"Masakan ini kelihatannya enak."},
  {"pattern":"～と思います","meaning":"saya pikir / menurut saya","level":"N4","formation":"Plain form + と思います","example":"明日は雨が降ると思います。","translation":"Saya pikir besok akan hujan."},
  {"pattern":"～と言います","meaning":"mengatakan bahwa","level":"N4","formation":"Plain form + と言います","example":"先生は『頑張って』と言いました。","translation":"Guru mengatakan 'semangat'."},
  {"pattern":"～たことがある","meaning":"pernah melakukan","level":"N4","formation":"Verb past + ことがある","example":"日本へ行ったことがあります。","translation":"Saya pernah pergi ke Jepang."},
  {"pattern":"～なければならない","meaning":"harus melakukan","level":"N4","formation":"Negative stem + なければならない","example":"宿題をしなければなりません。","translation":"Saya harus mengerjakan PR."},
  {"pattern":"～なくてもいい","meaning":"tidak harus","level":"N4","formation":"Negative stem + なくてもいい","example":"明日は来なくてもいいです。","translation":"Besok tidak harus datang."},
  {"pattern":"～てみる","meaning":"mencoba melakukan","level":"N4","formation":"Verb て-form + みる","example":"この漢字を書いてみます。","translation":"Saya akan mencoba menulis kanji ini."},
  {"pattern":"～ておく","meaning":"melakukan sebagai persiapan","level":"N4","formation":"Verb て-form + おく","example":"旅行の前にホテルを予約しておきます。","translation":"Saya memesan hotel terlebih dahulu sebelum perjalanan."},
  {"pattern":"～ので","meaning":"karena / sebab","level":"N4","formation":"Plain form + ので","example":"雨が降っているので、家にいます。","translation":"Karena sedang hujan, saya berada di rumah."},
  {"pattern":"～ために","meaning":"untuk / demi","level":"N3","formation":"Verb dictionary / Noun + の + ために","example":"日本で働くために、日本語を勉強しています。","translation":"Saya belajar bahasa Jepang untuk bekerja di Jepang."},
  {"pattern":"～によって","meaning":"oleh / tergantung pada / melalui","level":"N3","formation":"Noun + によって","example":"人によって考え方が違います。","translation":"Cara berpikir berbeda tergantung orangnya."},
  {"pattern":"～ように","meaning":"agar / supaya","level":"N3","formation":"Verb plain + ように","example":"忘れないようにメモします。","translation":"Saya mencatat supaya tidak lupa."},
  {"pattern":"～ことになる","meaning":"diputuskan / menjadi ketentuan","level":"N3","formation":"Verb dictionary + ことになる","example":"来月、日本へ行くことになりました。","translation":"Sudah diputuskan bahwa saya akan pergi ke Jepang bulan depan."},
  {"pattern":"～ことにする","meaning":"memutuskan sendiri","level":"N3","formation":"Verb dictionary + ことにする","example":"毎日一時間勉強することにします。","translation":"Saya memutuskan untuk belajar satu jam setiap hari."},
  {"pattern":"～ばかり","meaning":"baru saja / hanya","level":"N3","formation":"Verb past + ばかり","example":"日本に来たばかりです。","translation":"Saya baru saja datang ke Jepang."},
  {"pattern":"～はずです","meaning":"seharusnya / mestinya","level":"N3","formation":"Plain form + はずです","example":"彼はもう着くはずです。","translation":"Dia seharusnya sudah tiba sebentar lagi."},
  {"pattern":"～わけではない","meaning":"bukan berarti bahwa","level":"N3","formation":"Plain form + わけではない","example":"高い物が全部いいわけではありません。","translation":"Bukan berarti semua barang mahal itu bagus."},
  {"pattern":"～に対して","meaning":"terhadap / berlawanan dengan","level":"N3","formation":"Noun + に対して","example":"この問題に対して意見を述べます。","translation":"Saya menyampaikan pendapat terhadap masalah ini."},
  {"pattern":"～について","meaning":"mengenai / tentang","level":"N3","formation":"Noun + について","example":"日本の文化について勉強します。","translation":"Saya belajar tentang budaya Jepang."},
];

const readings = [
  {"title":"わたしの一日","level":"N5","text":"私は毎朝六時に起きます。朝ご飯を食べて、七時半に家を出ます。学校では日本語を勉強します。午後四時ごろ家に帰ります。","translation":"Saya bangun pukul enam setiap pagi. Setelah sarapan, saya keluar rumah pukul setengah delapan. Di sekolah saya belajar bahasa Jepang. Sekitar pukul empat sore saya pulang."},
  {"title":"週末の予定","level":"N5","text":"土曜日は友達と駅で会います。それから電車で町へ行きます。昼ご飯を食べて、本屋で日本語の本を買います。","translation":"Hari Sabtu saya bertemu teman di stasiun. Setelah itu kami pergi ke kota dengan kereta. Kami makan siang dan membeli buku bahasa Jepang di toko buku."},
  {"title":"日本語の勉強","level":"N5","text":"私は毎日ひらがなとカタカナを練習します。新しい言葉を十個覚えて、短い文を書きます。分からない言葉は辞書で調べます。","translation":"Saya berlatih hiragana dan katakana setiap hari. Saya menghafal sepuluh kata baru dan menulis kalimat pendek. Kata yang tidak saya pahami saya cari di kamus."},
  {"title":"新しい仕事","level":"N4","text":"来週から新しい仕事が始まります。仕事の前に必要な道具を準備して、予定を確認します。分からないことがあれば、先輩に質問します。","translation":"Minggu depan pekerjaan baru dimulai. Sebelum bekerja saya menyiapkan alat yang diperlukan dan memeriksa jadwal. Jika ada yang tidak saya pahami, saya bertanya kepada senior."},
  {"title":"旅行の準備","level":"N4","text":"来月、友達と京都へ旅行する予定です。ホテルはもう予約してあります。旅行の前に行きたい場所を調べて、必要な物を準備しておきます。","translation":"Bulan depan saya berencana bepergian ke Kyoto bersama teman. Hotel sudah dipesan. Sebelum perjalanan saya mencari tempat yang ingin dikunjungi dan menyiapkan barang yang diperlukan."},
  {"title":"日本での生活","level":"N4","text":"日本で生活を始めたとき、電車の使い方が少し難しいと思いました。しかし、毎日使っているうちに慣れてきました。今では一人でも安心して出かけられます。","translation":"Saat mulai hidup di Jepang, saya merasa cara menggunakan kereta sedikit sulit. Namun setelah menggunakannya setiap hari, saya mulai terbiasa. Sekarang saya bisa bepergian sendiri dengan tenang."},
  {"title":"技術と環境","level":"N3","text":"新しい技術は私たちの生活を便利にします。しかし、環境への影響も考える必要があります。生産方法を改善することは、会社にとって大切な課題です。","translation":"Teknologi baru membuat hidup kita lebih nyaman. Namun kita juga perlu memikirkan dampaknya terhadap lingkungan. Memperbaiki metode produksi merupakan tantangan penting bagi perusahaan."},
  {"title":"仕事の改善","level":"N3","text":"工場では品質を安定させるために、毎日の作業内容を確認しています。問題が起きた場合は原因を調べ、チームで改善方法を相談します。その結果を記録し、次の作業に生かします。","translation":"Di pabrik, isi pekerjaan harian diperiksa untuk menjaga kestabilan kualitas. Jika terjadi masalah, penyebabnya dicari dan tim mendiskusikan metode perbaikan. Hasilnya dicatat dan digunakan pada pekerjaan berikutnya."},
  {"title":"学び続ける理由","level":"N3","text":"外国語を身につけるためには、短期間で多く勉強するだけでは十分ではありません。毎日少しずつ続けることが重要です。失敗しても、その原因を確認して次の学習方法を改善すれば、少しずつ成長できます。","translation":"Untuk menguasai bahasa asing, belajar banyak hanya dalam waktu singkat tidak cukup. Yang penting adalah terus belajar sedikit demi sedikit setiap hari. Walaupun gagal, jika penyebabnya diperiksa dan cara belajar berikutnya diperbaiki, kemampuan dapat berkembang sedikit demi sedikit."},
];


const supabaseReady = Boolean(
  SUPABASE_URL &&
  SUPABASE_PUBLISHABLE_KEY &&
  !SUPABASE_URL.includes("YOUR_PROJECT") &&
  !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_PUBLISHABLE")
);
let supabase = null;
if (supabaseReady && window.supabase?.createClient) {
  try { supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY); }
  catch (e) { console.warn("Supabase init gagal; aplikasi tetap berjalan sebagai guest.", e); }
}
let authUser = null;
let remoteSyncTimer = null;

const $ = s => document.querySelector(s);
const app = $("#app");
const KEY = "japaneseJourneyV2";

const defaultState = {
  xp:0, streak:0, lastStudy:null, currentLevel:"Beginner", currentLesson:"Hiragana • A-row",
  completed:[], wrong:[], favorites:[], notes:{}, mastery:{}, quizHistory:[],
  account:null
};
let savedState = {};
try { savedState = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; }
catch (e) { console.warn("Progress lokal rusak, memakai state baru.", e); }
let state = {...defaultState, ...savedState};
state.completed = Array.isArray(state.completed) ? state.completed : [];
state.wrong = Array.isArray(state.wrong) ? state.wrong : [];
state.favorites = Array.isArray(state.favorites) ? state.favorites : [];
state.quizHistory = Array.isArray(state.quizHistory) ? state.quizHistory : [];
state.notes = state.notes && typeof state.notes === "object" ? state.notes : {};
state.mastery = state.mastery && typeof state.mastery === "object" ? state.mastery : {};

function save(){
  localStorage.setItem(KEY, JSON.stringify(state));
  const xpTop = $("#xpTop");
  if(xpTop) xpTop.textContent = `${state.xp} XP`;
  if(authUser && supabaseReady) queueRemoteSync();
}

function queueRemoteSync(){
  clearTimeout(remoteSyncTimer);
  remoteSyncTimer=setTimeout(()=>syncProgressToCloud(),500);
}

async function syncProgressToCloud(){
  if(!authUser || !supabase) return;
  const payload={
    user_id:authUser.id,
    xp:state.xp,
    streak:state.streak,
    last_study:state.lastStudy,
    current_level:state.currentLevel,
    current_lesson:state.currentLesson,
    completed:state.completed,
    wrong:state.wrong,
    favorites:state.favorites,
    notes:state.notes,
    mastery:state.mastery,
    quiz_history:state.quizHistory,
    updated_at:new Date().toISOString()
  };
  const {error}=await supabase.from("learning_progress").upsert(payload,{onConflict:"user_id"});
  if(error) console.warn("Cloud sync:",error.message);
}

async function loadProgressFromCloud(){
  if(!authUser || !supabase) return;
  const {data,error}=await supabase.from("learning_progress").select("*").eq("user_id",authUser.id).maybeSingle();
  if(error){ console.warn("Load progress:",error.message); return; }
  if(!data){ await syncProgressToCloud(); return; }
  state={
    ...state,
    xp:data.xp ?? state.xp,
    streak:data.streak ?? state.streak,
    lastStudy:data.last_study ?? state.lastStudy,
    currentLevel:data.current_level ?? state.currentLevel,
    currentLesson:data.current_lesson ?? state.currentLesson,
    completed:data.completed ?? state.completed,
    wrong:data.wrong ?? state.wrong,
    favorites:data.favorites ?? state.favorites,
    notes:data.notes ?? state.notes,
    mastery:data.mastery ?? state.mastery,
    quizHistory:data.quiz_history ?? state.quizHistory
  };
  localStorage.setItem(KEY,JSON.stringify(state));
}
save();

function speak(text, rate=1){
  if(!("speechSynthesis" in window)) return alert("Browser ini belum mendukung Text-to-Speech.");
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP"; u.rate = rate;
  speechSynthesis.speak(u);
}
window.speak = speak;

function addXP(n=5){
  state.xp += n;
  const today = new Date().toISOString().slice(0,10);
  if(state.lastStudy !== today){
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    state.streak = state.lastStudy === yesterday ? state.streak+1 : 1;
    state.lastStudy = today;
  }
  save();
}
function mastery(id){ return state.mastery[id] || 0; }
function bumpMastery(id, correct){
  const m = mastery(id);
  state.mastery[id] = Math.max(0, Math.min(100, m + (correct ? 14 : -7)));
  if(!correct && !state.wrong.includes(id)) state.wrong.push(id);
  if(correct && state.mastery[id] >= 70) state.wrong = state.wrong.filter(x=>x!==id);
  save();
}
function route(){
  const raw = location.hash.replace("#","") || "/home";
  return raw.split("?")[0];
}
function hashParams(){
  const raw = location.hash.split("?")[1] || "";
  return new URLSearchParams(raw);
}
function navigate(path){ location.hash = path; }

const header = (eyebrow,title,sub="") => `<section class="section-head"><div><small class="eyebrow">${eyebrow}</small><h2>${title}</h2>${sub?`<p>${sub}</p>`:""}</div></section>`;

function home(){
  const learned = Object.values(state.mastery).filter(x=>x>=70).length;
  const accuracy = state.quizHistory.length ? Math.round(100*state.quizHistory.filter(x=>x.correct).length/state.quizHistory.length) : 0;
  const displayName = authUser?.user_metadata?.full_name || authUser?.email || ""; 
  const learner = displayName ? `, ${escapeHtml(displayName.split(" ")[0])}` : "";
  app.innerHTML = `
  <section class="hero">
    <div class="hero-copy">
      <small class="eyebrow">JAPANESE LEARNING PLATFORM</small>
      <h1>Belajar bahasa Jepang dari <span class="accent">nol sampai N3.</span></h1>
      <p>Belajar bertahap: pelajari materi, kerjakan kuis, latihan tanpa batas, review kesalahan, lalu lanjut ke tahap berikutnya.</p>
      <div class="btn-row"><button class="btn primary" id="continueHero">▶ Mulai Belajar${learner}</button><a class="btn secondary" href="#/profile">👤 Profil Belajar</a></div>
    </div>
    <div class="hero-visual"><div class="floating-card"><div class="kana-card">あ</div><div class="kana-card k2">N3</div><div class="kana-card k3">日本</div></div></div>
  </section>
  <section class="stats-grid">
    <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
    <div class="stat-card"><small>⭐ Total XP</small><strong>${state.xp} XP</strong></div>
    <div class="stat-card"><small>🎯 Akurasi</small><strong>${accuracy}%</strong></div>
    <div class="stat-card"><small>✅ Dikuasai</small><strong>${learned} item</strong></div>
  </section>
  <section class="section">
    ${header("CONTINUE LEARNING","Lanjutkan pembelajaran","Materi, latihan, kuis, dan review berada dalam satu alur belajar.")}
    <div class="continue-card">
      <div><span class="badge blue">${state.currentLevel}</span><h3 style="margin-top:10px">${state.currentLesson}</h3><p>Mulai dari Hiragana dan Katakana, kemudian naik bertahap menuju N5, N4, dan N3.</p><div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,Object.keys(state.mastery).length*2)}%"></div></div></div>
      <button class="btn primary" id="continueCard">Buka Belajar →</button>
    </div>
  </section>`;
  $("#continueHero").onclick = $("#continueCard").onclick = ()=>navigate("/learn");
}

function learningPath(){
  const steps = [
    ["🌱","Beginner","Pronunciation, greetings, basic expressions","current"],
    ["あ","Hiragana","Basic, dakuten, handakuten, yōon",""],
    ["ア","Katakana","Basic & loanword combinations",""],
    ["🇯🇵","JLPT N5","Vocabulary, Kanji, Grammar, Reading",""],
    ["🇯🇵","JLPT N4","Elementary-intermediate Japanese","locked"],
    ["🇯🇵","JLPT N3","Intermediate Japanese & JLPT prep","locked"],
    ["🏆","N3 Master","Mock test & weak-area review","locked"]
  ];
  app.innerHTML = `${header("LEARNING PATH","Jalur Belajar","Ikuti roadmap dari nol sampai JLPT N3.")}
  <div class="roadmap">${steps.map((s,i)=>`<div class="road-step ${s[3]}"><div class="road-icon">${s[0]}</div><div><h3>${s[1]}</h3><p style="margin:0">${s[2]}</p></div><span class="badge ${i<2?"blue":i===0?"green":""}">${i===0?"In Progress":s[3]==="locked"?"🔒 Locked":"Not Started"}</span></div>`).join("")}</div>`;
}

function learn(){
  const steps = [
    ["🌱","Beginner","Dasar pelafalan dan pengenalan bahasa Jepang","current"],
    ["あ","Hiragana","Belajar huruf → kuis 50 soal → latihan random tanpa batas",""],
    ["ア","Katakana","Belajar huruf → kuis 50 soal → latihan random tanpa batas",""],
    ["🇯🇵","JLPT N5","Vocabulary, Kanji, Grammar, Listening, Reading",""],
    ["🇯🇵","JLPT N4","Materi tingkat dasar-menengah","locked"],
    ["🇯🇵","JLPT N3","Materi menengah & persiapan JLPT","locked"],
    ["🏆","N3 Master","Mock test dan penguatan area lemah","locked"]
  ];
  app.innerHTML = `${header("BELAJAR","Learning Path","Jalur belajar dan seluruh materi sekarang berada dalam satu menu.")}
  <div class="roadmap compact-roadmap">
    ${steps.map((s,i)=>{
      const href = i===0 ? "#/placement" : i===1 ? "#/learn/kana" : i===2 ? "#/learn/kana?type=katakana" : i===3 ? "#/learn/vocab?level=N5" : i===4 ? "#/learn/vocab?level=N4" : i===5 ? "#/learn/vocab?level=N3" : "#/progress";
      return `<a class="road-step path-link" href="${href}"><div class="road-icon">${s[0]}</div><div><h3>${s[1]}</h3><p style="margin:0">${s[2]}</p></div><span class="badge blue">${i===0?"Mulai":"Buka"} →</span></a>`;
    }).join("")}
  </div>
  <section class="section">
    ${header("MATERI","Pilih materi","Setiap materi nantinya mengikuti alur Belajar → Latihan → Kuis → Review.")}
    <div class="grid three">
    ${[
      ["🔤","Kana","Hiragana dan Katakana lengkap dengan kuis serta latihan random.","#/learn/kana"],
      ["🈶","Kanji","Meaning, readings, stroke count, examples, dan level.","#/learn/kanji"],
      ["📖","Vocabulary","Kosakata bertahap untuk N5, N4, dan N3.","#/learn/vocab"],
      ["🧩","Grammar","Pola, penjelasan, contoh, dan latihan.","#/learn/grammar"],
      ["🎧","Listening","Latihan mendengar bahasa Jepang.","#/learn/listening"],
      ["📚","Reading","Bacaan bertingkat dari N5 sampai N3.","#/learn/reading"]
    ].map(x=>`<a class="card hover module-card" href="${x[3]}"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></a>`).join("")}
    </div>
  </section>
  ${state.wrong.length ? `<section class="section"><div class="card review-inline"><div><small class="eyebrow">REVIEW SAAT BELAJAR</small><h2>${state.wrong.length} item perlu diulang</h2><p>Item yang salah akan muncul sebagai review di dalam alur pembelajaran, bukan sebagai menu terpisah.</p></div><button class="btn primary" id="inlineReview">Mulai Review</button></div></section>` : ""}`;
  if($("#inlineReview")) $("#inlineReview").onclick=()=>review();
}

function kanaPage(){
 let type=hashParams().get("type")==="katakana" ? "katakana" : "hiragana", group="basic";
 const label=()=>type==="hiragana"?"Hiragana":"Katakana";
 const render=()=>{
   const items=kana.filter(k=>k.type===type&&(group==="all"||k.group===group));
   $("#kanaArea").innerHTML=items.map(k=>`<button class="kana-box" data-char="${k.character}"><div class="kana-char">${k.character}</div><div class="kana-romaji">${k.romaji}</div></button>`).join("");
   document.querySelectorAll(".kana-box").forEach(b=>b.onclick=()=>speak(b.dataset.char));
   $("#quizTitle").textContent=`Kuis ${label()} — 50 Soal`;
   $("#randomTitle").textContent=`Tebak ${label()} — Tanpa Batas`;
   $("#quizDesc").textContent=`Setelah menghafal ${label()}, uji kemampuan dengan 50 soal acak.`;
   $("#randomDesc").textContent=`Huruf ${label()} akan terus diacak sampai kamu memilih selesai belajar.`;
 };
 app.innerHTML=`${header("KANA","Hiragana & Katakana","Pelajari huruf terlebih dahulu, kemudian langsung lanjut ke kuis dan latihan.")}
 <div class="tabs"><button class="tab active" data-type="hiragana">Hiragana</button><button class="tab" data-type="katakana">Katakana</button></div>
 <div class="tabs"><button class="tab active" data-group="basic">Basic</button><button class="tab" data-group="dakuten">Dakuten</button><button class="tab" data-group="handakuten">Handakuten</button><button class="tab" data-group="yoon">Yōon</button><button class="tab" data-group="all">Semua</button></div>
 <div id="kanaArea" class="kana-grid"></div>
 <section class="section">
   ${header("SETELAH MENGHAFAL","Langsung latihan","Tidak perlu berpindah ke menu Practice.")}
   <div class="grid three">
     <button class="card hover practice-card" id="integratedQuiz"><span class="badge blue">50 Soal</span><h3 id="quizTitle"></h3><p id="quizDesc"></p></button>
     <button class="card hover practice-card" id="integratedRandom"><span class="badge blue">♾ Endless</span><h3 id="randomTitle"></h3><p id="randomDesc"></p></button>
     <a class="card hover practice-card" href="#/practice/kana"><span class="badge blue">Writing</span><h3>✍️ Latihan Menulis Kana</h3><p>Latih bentuk huruf menggunakan canvas.</p></a>
   </div>
 </section>
 ${state.wrong.length ? `<section class="section"><div class="card review-inline"><div><small class="eyebrow">REVIEW</small><h3>${state.wrong.length} item perlu diulang</h3><p>Review muncul langsung di area belajar berdasarkan jawaban yang masih salah.</p></div><button class="btn outline" id="kanaReview">Buka Review</button></div></section>`:""}`;
 document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");type=b.dataset.type;group="basic";document.querySelectorAll("[data-group]").forEach((x,i)=>x.classList.toggle("active",i===0));render()});
 document.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-group]").forEach(x=>x.classList.remove("active"));b.classList.add("active");group=b.dataset.group;render()});
 $("#integratedQuiz").onclick=()=>kanaQuiz(type);
 $("#integratedRandom").onclick=()=>kanaEndless(type);
 if($("#kanaReview")) $("#kanaReview").onclick=()=>review();
 render();
}

function kanjiPage(){
 let level="ALL";
 const draw=()=>{
  const list=kanji.filter(k=>level==="ALL"||k.level===level);
  $("#kanjiList").innerHTML=list.map(k=>`<div class="list-card"><div class="road-icon jp" style="font-size:28px">${k.k}</div><div class="list-main"><strong>${k.meaning}</strong><small>${k.on} • ${k.kun} • ${k.strokes} strokes • ${k.radical}</small></div><span class="badge blue">${k.level}</span><button class="icon-btn" onclick="speak('${k.k}')">🔊</button></div>`).join("");
 };
 app.innerHTML=`${header("KANJI LIBRARY","Kanji Library","Koleksi Kanji terstruktur N5–N3 untuk kurikulum pengembangan.")}
 <div class="tabs">${["ALL","N5","N4","N3"].map((x,i)=>`<button class="tab ${i===0?"active":""}" data-level="${x}">${x}</button>`).join("")}</div>
 <div class="card"><div id="kanjiList"></div></div>
 <div class="btn-row"><a href="#/practice/kanji" class="btn primary">✍️ Kanji Writing</a></div>`;
 document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-level]").forEach(x=>x.classList.remove("active"));b.classList.add("active");level=b.dataset.level;draw()});draw();
}

function vocabPage(){
 app.innerHTML=`${header("VOCABULARY","Vocabulary N5 → N3","Kosakata bertahap N5–N3 untuk kurikulum pengembangan.")}
 <div class="grid three">${["N5","N4","N3"].map(level=>`<div class="card"><span class="badge blue">${level}</span><h2>${vocab.filter(v=>v.level===level).length} kata</h2>${vocab.filter(v=>v.level===level).map(v=>`<div class="list-card"><div class="list-main"><strong class="jp">${v.word} <small>${v.reading}</small></strong><small>${v.meaning} • ${v.category}</small></div><button class="icon-btn" onclick="speak('${v.word}')">🔊</button></div>`).join("")}</div>`).join("")}</div>`;
}
function grammarPage(){
 app.innerHTML=`${header("GRAMMAR","Grammar Lessons","Pattern → meaning → formation → examples → practice.")}
 <div class="grid two">${grammar.map(g=>`<div class="card"><span class="badge blue">${g.level}</span><h2 class="jp">${g.pattern}</h2><p><strong>Meaning:</strong> ${g.meaning}</p><p><strong>Formation:</strong> ${g.formation}</p><div class="card" style="padding:14px;background:#f8fbff"><strong class="jp">${g.example}</strong><small style="display:block;color:var(--muted);margin-top:5px">${g.translation}</small></div><div class="btn-row"><button class="btn outline" onclick="speak('${g.example}')">🔊 Listen</button><button class="btn primary" onclick="startQuiz('grammar')">Practice</button></div></div>`).join("")}</div>`;
}
function listeningPage(){
 const item=vocab[Math.floor(Math.random()*vocab.length)];
 app.innerHTML=`${header("LISTENING","Listening Lab","Versi awal menggunakan Japanese Text-to-Speech dari browser.")}
 <div class="card quiz-shell"><span class="badge blue">${item.level}</span><h2>Dengarkan lalu pilih artinya</h2><div style="text-align:center;margin:30px"><button class="btn primary" id="listenPlay">🔊 Putar Audio</button></div><div id="listenAnswers" class="answers"></div></div>`;
 $("#listenPlay").onclick=()=>speak(item.word,.9);
 const opts=[item,...vocab.filter(v=>v.word!==item.word).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
 $("#listenAnswers").innerHTML=opts.map(o=>`<button class="answer">${o.meaning}</button>`).join("");
 document.querySelectorAll(".answer").forEach((b,i)=>b.onclick=()=>{const ok=opts[i].word===item.word;b.classList.add(ok?"correct":"wrong");b.textContent += ok?" ✓":" ✕";bumpMastery("v:"+item.word,ok);if(ok)addXP(8)});
}
function readingPage(){
 app.innerHTML=`${header("READING","Reading Library","Bacaan pendek bertingkat dari N5 sampai N3.")}
 <div class="grid three">${readings.map(r=>`<article class="card"><span class="badge blue">${r.level}</span><h3 style="margin-top:12px">${r.title}</h3><p class="jp" style="font-size:18px;color:var(--ink)">${r.text}</p><details><summary>Terjemahan</summary><p>${r.translation}</p></details><button class="btn outline" onclick="speak('${r.text}',.9)">🔊 Dengarkan</button></article>`).join("")}</div>`;
}

function practice(){
 app.innerHTML=`${header("PRACTICE","Latihan","Pilih latihan sesuai materi yang ingin kamu kuasai.")}
 <div class="grid two">
   <a class="card hover" href="#/practice/hiragana-quiz"><span class="badge blue">50 Soal</span><h3>あ Hiragana Quiz</h3><p>Kuis khusus Hiragana sebanyak 50 soal acak.</p></a>
   <a class="card hover" href="#/practice/katakana-quiz"><span class="badge blue">50 Soal</span><h3>ア Katakana Quiz</h3><p>Kuis khusus Katakana sebanyak 50 soal acak.</p></a>
   <a class="card hover" href="#/practice/hiragana-random"><span class="badge blue">♾ Endless</span><h3>Hiragana Random</h3><p>Tebak huruf Hiragana secara acak tanpa batas sampai kamu memilih selesai.</p></a>
   <a class="card hover" href="#/practice/katakana-random"><span class="badge blue">♾ Endless</span><h3>Katakana Random</h3><p>Tebak huruf Katakana secara acak tanpa batas sampai kamu memilih selesai.</p></a>
   <a class="card hover" href="#/practice/kana"><h3>✎ Kana Writing</h3><p>Latihan menulis Kana menggunakan canvas.</p></a>
   <a class="card hover" href="#/practice/kanji"><h3>漢 Kanji Writing</h3><p>Latihan menulis Kanji menggunakan canvas.</p></a>
 </div>`;
}

function startQuiz(mode){
 let pool, getQ;
 if(mode==="kana"){pool=kana.filter(k=>k.group==="basic");getQ=x=>({prompt:x.character,answer:x.romaji,options:shuffle([x.romaji,...shuffle(pool.filter(y=>y.romaji!==x.romaji)).slice(0,3).map(y=>y.romaji)]),id:"k:"+x.character})}
 if(mode==="vocab"){pool=vocab;getQ=x=>({prompt:x.word,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"v:"+x.word})}
 if(mode==="kanji"){pool=kanji;getQ=x=>({prompt:x.k,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"j:"+x.k})}
 if(mode==="grammar"){pool=grammar;getQ=x=>({prompt:x.pattern,answer:x.meaning,options:shuffle([x.meaning,...shuffle(pool.filter(y=>y.meaning!==x.meaning)).slice(0,3).map(y=>y.meaning)]),id:"g:"+x.pattern})}
 let count=0, correct=0, current;
 const next=()=>{
  current=getQ(pool[Math.floor(Math.random()*pool.length)]);
  app.innerHTML=`${header("QUIZ",`${mode.toUpperCase()} Practice`,`Soal ${count+1} / 10 • Benar ${correct}`)}
  <div class="card quiz-shell"><div class="quiz-question">${current.prompt}</div><div class="answers">${current.options.map(o=>`<button class="answer" data-a="${escapeHtml(o)}">${o}</button>`).join("")}</div><div id="feedback" style="margin-top:16px"></div></div>`;
  document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(b,b.dataset.a));
 };
 const answer=(btn,a)=>{
   const ok=a===current.answer;
   document.querySelectorAll(".answer").forEach(b=>b.disabled=true);
   btn.classList.add(ok?"correct":"wrong");
   if(ok){correct++;addXP(5)}
   bumpMastery(current.id,ok);
   state.quizHistory.push({mode,correct:ok,date:Date.now()}); save();
   $("#feedback").innerHTML=`<div class="${ok?"":"notice"}"><strong>${ok?"✅ Benar!":"⚠️ Belum tepat."}</strong> Jawaban: <strong>${current.answer}</strong></div><div class="btn-row"><button id="nextQ" class="btn primary">${count===9?"Lihat Hasil":"Soal Berikutnya"} →</button></div>`;
   $("#nextQ").onclick=()=>{count++; if(count>=10) result(); else next();};
 };
 const result=()=>{
   const pct=Math.round(correct/10*100);
   app.innerHTML=`${header("RESULT","Hasil Latihan")}<div class="card quiz-shell" style="text-align:center"><div class="progress-circle" style="--pct:${pct}%;margin:20px auto"><strong>${pct}%</strong></div><h2>${correct} / 10 benar</h2><p>${pct>=80?"Bagus. Pertahankan dan lanjutkan materi berikutnya.":"Ulangi item yang masih sulit melalui Smart Review."}</p><div class="btn-row" style="justify-content:center"><button class="btn primary" id="again">Coba Lagi</button><a class="btn outline" href="#/review">Review</a></div></div>`;
   $("#again").onclick=()=>startQuiz(mode);
 };
 next();
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function escapeHtml(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}

function writing(kind="kana"){
 const target = kind==="kanji" ? kanji[0].k : "あ";
 app.innerHTML=`${header("WRITING PRACTICE",kind==="kanji"?"Kanji Writing":"Kana Writing Practice","Gunakan mouse, touchscreen, atau stylus. Penilaian versi awal menggunakan heuristic sederhana.")}
 <div class="canvas-wrap">
  <div class="canvas-panel"><canvas id="writeCanvas" class="writing-canvas" width="700" height="700"></canvas><div class="btn-row"><button class="btn secondary" id="clearCanvas">Clear</button><button class="btn primary" id="checkCanvas">Check</button><button class="btn outline" id="nextCanvas">Next</button></div><div id="writeFeedback"></div></div>
  <aside class="card"><small class="eyebrow">TARGET</small><div id="targetBig" class="target-big">${target}</div><p class="stroke-hint">Mode: Free Writing. Trace/animated stroke guide memerlukan dataset stroke-order tervalidasi dan sengaja belum dipalsukan pada development build.</p><button class="btn outline" onclick="speak(document.querySelector('#targetBig').textContent)">🔊 Listen</button></aside>
 </div>`;
 const c=$("#writeCanvas"),ctx=c.getContext("2d");let drawing=false,points=0,last=null;
 ctx.lineWidth=16;ctx.lineCap="round";ctx.strokeStyle="#1d4ed8";
 const pos=e=>{const r=c.getBoundingClientRect(),t=e.touches?.[0]||e;return {x:(t.clientX-r.left)*c.width/r.width,y:(t.clientY-r.top)*c.height/r.height}};
 const start=e=>{e.preventDefault();drawing=true;last=pos(e);points++};
 const move=e=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;points++};
 const stop=()=>drawing=false;
 c.addEventListener("pointerdown",start);c.addEventListener("pointermove",move);window.addEventListener("pointerup",stop);
 $("#clearCanvas").onclick=()=>{ctx.clearRect(0,0,c.width,c.height);points=0;$("#writeFeedback").innerHTML=""};
 $("#checkCanvas").onclick=()=>{const score=Math.min(100,Math.round(points/2));const label=score>75?"⭐ Excellent":score>45?"✅ Good":"⚠️ Try Again";$("#writeFeedback").innerHTML=`<p><strong>${label}</strong> — heuristic engagement score ${score}%.</p>`;if(score>45)addXP(4)};
 $("#nextCanvas").onclick=()=>{const pool=kind==="kanji"?kanji.map(x=>x.k):kana.filter(x=>x.group==="basic").map(x=>x.character);$("#targetBig").textContent=pool[Math.floor(Math.random()*pool.length)];$("#clearCanvas").click()};
}


function kanaQuiz(mode="hiragana"){
  const pool = kana.filter(x => x.type === mode);
  if(!pool.length){
    app.innerHTML = `${header("KANA QUIZ","Data belum tersedia","Tambahkan data Kana untuk memulai kuis.")}`;
    return;
  }
  const questions = Array.from({length:50}, (_,i)=>{
    const correct = pool[Math.floor(Math.random()*pool.length)];
    const distractors = [...pool].filter(x=>x.character!==correct.character)
      .sort(()=>Math.random()-.5).slice(0,3);
    return {no:i+1, correct, options:[correct,...distractors].sort(()=>Math.random()-.5)};
  });
  let idx=0, score=0, locked=false;
  const renderQ=()=>{
    const q=questions[idx];
    app.innerHTML = `${header(mode==="hiragana"?"HIRAGANA QUIZ":"KATAKANA QUIZ",`Soal ${idx+1} dari 50`,"Pilih romaji yang sesuai dengan huruf yang ditampilkan.")}
      <div class="quiz-shell card">
        <div class="quiz-top"><span class="badge blue">${mode==="hiragana"?"Hiragana":"Katakana"}</span><strong>${score} benar</strong></div>
        <div class="quiz-progress"><div style="width:${((idx+1)/50)*100}%"></div></div>
        <div class="kana-question jp">${q.correct.character}</div>
        <div class="answers kana-answers">
          ${q.options.map((o,n)=>`<button class="answer-btn" data-romaji="${o.romaji}">${String.fromCharCode(65+n)}. ${o.romaji}</button>`).join("")}
        </div>
        <div id="kanaFeedback" class="quiz-feedback" aria-live="polite"></div>
      </div>`;
    document.querySelectorAll(".answer-btn").forEach(btn=>btn.onclick=()=>{
      if(locked) return;
      locked=true;
      const ok=btn.dataset.romaji===q.correct.romaji;
      if(ok){score++; addXP(2);}
      btn.classList.add(ok?"correct":"wrong");
      document.querySelectorAll(".answer-btn").forEach(b=>{
        if(b.dataset.romaji===q.correct.romaji) b.classList.add("correct");
        b.disabled=true;
      });
      $("#kanaFeedback").innerHTML=`<strong>${ok?"Benar!":"Belum tepat."}</strong> ${q.correct.character} = ${q.correct.romaji}
        <button class="btn primary" id="nextKana">${idx===49?"Lihat Hasil":"Soal Berikutnya →"}</button>`;
      $("#nextKana").onclick=()=>{
        if(idx===49){
          const pct=Math.round(score/50*100);
          app.innerHTML=`${header(mode==="hiragana"?"HIRAGANA QUIZ":"KATAKANA QUIZ","Kuis selesai",`Kamu menjawab ${score} dari 50 soal dengan benar.`)}
          <div class="card result-card"><div class="result-score">${pct}%</div><h2>${score}/50 benar</h2>
          <div class="btn-row"><button class="btn primary" id="retryKana">Ulangi 50 Soal</button><a class="btn secondary" href="#/learn/kana">Kembali ke Kana</a></div></div>`;
          $("#retryKana").onclick=()=>kanaQuiz(mode);
        } else {idx++; locked=false; renderQ();}
      };
    });
  };
  renderQ();
}

function kanaEndless(mode="hiragana"){
  const pool = kana.filter(x => x.type === mode);
  if(!pool.length){
    app.innerHTML = `${header("RANDOM KANA","Data belum tersedia","Tambahkan data Kana untuk memulai latihan.")}`;
    return;
  }
  let total=0, correctCount=0, current=null, locked=false;
  const next=()=>{
    locked=false;
    let candidate;
    do { candidate=pool[Math.floor(Math.random()*pool.length)]; }
    while(pool.length>1 && current && candidate.character===current.character);
    current=candidate;
    const distractors=[...pool].filter(x=>x.character!==current.character)
      .sort(()=>Math.random()-.5).slice(0,3);
    const options=[current,...distractors].sort(()=>Math.random()-.5);
    app.innerHTML=`${header("ENDLESS RANDOM",mode==="hiragana"?"Tebak Hiragana":"Tebak Katakana","Huruf akan terus diacak. Berhenti kapan saja saat kamu sudah selesai belajar.")}
      <div class="quiz-shell card">
        <div class="quiz-top"><span class="badge blue">♾ Endless</span><strong>${correctCount}/${total} benar</strong></div>
        <div class="kana-question jp">${current.character}</div>
        <p class="center-muted">Huruf ini dibaca apa?</p>
        <div class="answers kana-answers">
          ${options.map((o,n)=>`<button class="answer-btn" data-romaji="${o.romaji}">${String.fromCharCode(65+n)}. ${o.romaji}</button>`).join("")}
        </div>
        <div id="kanaFeedback" class="quiz-feedback" aria-live="polite"></div>
        <div class="endless-actions"><a class="btn secondary" href="#/practice">Selesai Belajar</a></div>
      </div>`;
    document.querySelectorAll(".answer-btn").forEach(btn=>btn.onclick=()=>{
      if(locked) return;
      locked=true; total++;
      const ok=btn.dataset.romaji===current.romaji;
      if(ok){correctCount++; addXP(1);}
      btn.classList.add(ok?"correct":"wrong");
      document.querySelectorAll(".answer-btn").forEach(b=>{
        if(b.dataset.romaji===current.romaji) b.classList.add("correct");
        b.disabled=true;
      });
      $("#kanaFeedback").innerHTML=`<strong>${ok?"Benar!":"Belum tepat."}</strong> ${current.character} = ${current.romaji}
        <button class="btn primary" id="nextRandom">Huruf Berikutnya →</button>`;
      $("#nextRandom").onclick=next;
    });
  };
  next();
}

function review(){
 const items=state.wrong;
 app.innerHTML=`${header("SMART REVIEW","Review","Item yang salah atau mastery-nya masih rendah akan diprioritaskan.")}
 <div class="grid two">
  <div class="card"><h3>Due Today</h3><h2>${items.length} item</h2><p>Semakin sering salah, semakin cepat item muncul kembali.</p></div>
  <div class="card"><h3>Recently Learned</h3><h2>${Object.keys(state.mastery).length} item</h2><p>Mastery disimpan lokal pada browser.</p></div>
 </div>
 <div class="card section">${items.length?items.map(id=>`<div class="list-card"><div class="list-main"><strong>${id.replace(/^[a-z]:/,"")}</strong><small>Mastery ${mastery(id)}%</small></div><span class="badge amber">Review</span></div>`).join(""):`<div class="empty">Belum ada item untuk direview. Coba kerjakan quiz terlebih dahulu.</div>`}</div>
 <div class="btn-row"><button class="btn primary" id="reviewQuiz">Mulai Review</button></div>`;
 $("#reviewQuiz").onclick=()=>startQuiz("vocab");
}
function progress(){
 const hist=state.quizHistory, acc=hist.length?Math.round(hist.filter(x=>x.correct).length/hist.length*100):0;
 const mastered=Object.values(state.mastery).filter(x=>x>=70).length;
 app.innerHTML=`${header("PROGRESS","Your Progress","Pantau kemampuan, kebiasaan belajar, dan area yang perlu diperkuat.")}
 <div class="stats-grid"><div class="stat-card"><small>🔥 Daily Streak</small><strong>${state.streak} hari</strong></div><div class="stat-card"><small>⭐ XP</small><strong>${state.xp}</strong></div><div class="stat-card"><small>🎯 Quiz Accuracy</small><strong>${acc}%</strong></div><div class="stat-card"><small>✅ Mastered</small><strong>${mastered}</strong></div></div>
 <div class="grid three">
 ${["N5","N4","N3"].map((l,i)=>{const pct=Math.min(100,Math.max(0,Math.round((mastered-(i*8))*6)));return `<div class="card"><span class="badge blue">${l}</span><h2>${pct}%</h2><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div><p>${i===0?"Fondasi & kemampuan dasar":"Terbuka bertahap setelah mastery level sebelumnya cukup."}</p></div>`}).join("")}
 </div>
 <div class="card section"><small class="eyebrow">💡 RECOMMENDED FOR YOU</small><h2>${state.wrong.length?"Fokuskan Smart Review":"Lanjutkan jalur belajar"}</h2><p>${state.wrong.length?`Ada ${state.wrong.length} item yang perlu diperkuat.`:"Kerjakan quiz untuk membangun data mastery dan rekomendasi yang lebih personal."}</p><a class="btn primary" href="${state.wrong.length?"#/review":"#/learning-path"}">${state.wrong.length?"Practice Review":"Continue Learning"}</a></div>`;
}
function placement(){
 app.innerHTML=`${header("PLACEMENT TEST","Find My Level","Pilih titik awal yang paling sesuai.")}
 <div class="grid two">${[
 ["🌱","I'm completely new","Mulai dari Beginner dan Kana.","Beginner"],
 ["🔤","I know Hiragana & Katakana","Mulai dari dasar JLPT N5.","N5"],
 ["📚","I already know basic Japanese","Gunakan quiz diagnostic singkat.","TEST"],
 ["🎯","I want to prepare for N3","Gunakan diagnostic test sebelum N3.","TEST"]
 ].map(x=>`<button class="card hover" data-placement="${x[3]}" style="text-align:left"><div style="font-size:28px">${x[0]}</div><h3 style="margin-top:12px">${x[1]}</h3><p>${x[2]}</p></button>`).join("")}</div>`;
 document.querySelectorAll("[data-placement]").forEach(b=>b.onclick=()=>{if(b.dataset.placement==="TEST")startQuiz("vocab");else{state.currentLevel=b.dataset.placement;state.currentLesson=b.dataset.placement==="Beginner"?"Hiragana • A-row":"N5 • Vocabulary Basics";save();navigate("/home")}});
}

function progress(){
  const history=state.quizHistory || [];
  const correct=history.filter(x=>x.correct).length;
  const accuracy=history.length ? Math.round(correct/history.length*100) : 0;
  const masteryVals=Object.values(state.mastery || {});
  const mastered=masteryVals.filter(x=>Number(x)>=70).length;

  const kanaItems=(type)=>kana.filter(x=>x.type===type);
  const kanaDone=(type)=>kanaItems(type).filter(x=>{
    const keys=[`${type}:${x.character}`,x.character,`${type}-${x.character}`];
    return keys.some(k=>Number(state.mastery?.[k]||0)>=70) || (state.completed||[]).some(v=>String(v).includes(x.character));
  }).length;

  const hTotal=kanaItems("hiragana").length, kTotal=kanaItems("katakana").length;
  const hDone=kanaDone("hiragana"), kDone=kanaDone("katakana");
  const pct=(a,b)=>b?Math.min(100,Math.round(a/b*100)):0;

  const levelProgress=level=>{
    const items=[
      ...vocab.filter(x=>x.level===level).map(x=>x.word),
      ...kanji.filter(x=>x.level===level).map(x=>x.k),
      ...grammar.filter(x=>x.level===level).map(x=>x.pattern)
    ];
    const done=items.filter(item=>{
      return Number(state.mastery?.[item]||0)>=70 ||
        (state.completed||[]).some(v=>String(v).includes(item));
    }).length;
    return {done,total:items.length,percent:pct(done,items.length)};
  };

  const n5=levelProgress("N5"), n4=levelProgress("N4"), n3=levelProgress("N3");
  const quizScores=history.map(x=>Number(x.score)).filter(Number.isFinite);
  const lastScore=quizScores.length?quizScores.at(-1):null;
  const bestScore=quizScores.length?Math.max(...quizScores):null;
  const wrongCount=(state.wrong||[]).length;

  const bar=(label,done,total,percent)=>`
    <div class="progress-row">
      <div class="progress-label"><strong>${label}</strong><span>${done}/${total} • ${percent}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
    </div>`;

  app.innerHTML=`${header("PROGRES","Progres Belajar","Pantau perkembangan belajar dari Kana hingga N3. Progres tersimpan ke akun saat kamu login.")}
  <div class="stats-grid">
    <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
    <div class="stat-card"><small>⭐ Total XP</small><strong>${state.xp}</strong></div>
    <div class="stat-card"><small>🎯 Akurasi</small><strong>${accuracy}%</strong></div>
    <div class="stat-card"><small>✅ Dikuasai</small><strong>${mastered}</strong></div>
  </div>

  <div class="card section">
    <div class="section-head"><div><span class="eyebrow">KANA</span><h2>Hiragana & Katakana</h2></div></div>
    ${bar("Hiragana",hDone,hTotal,pct(hDone,hTotal))}
    ${bar("Katakana",kDone,kTotal,pct(kDone,kTotal))}
  </div>

  <div class="card section">
    <div class="section-head"><div><span class="eyebrow">JLPT PATH</span><h2>Perkembangan N5 → N3</h2></div></div>
    ${bar("N5",n5.done,n5.total,n5.percent)}
    ${bar("N4",n4.done,n4.total,n4.percent)}
    ${bar("N3",n3.done,n3.total,n3.percent)}
    <p class="muted progress-note">Persentase dihitung dari materi kurikulum yang tersedia di Japanese Journey saat ini.</p>
  </div>

  <div class="progress-two section">
    <div class="card">
      <span class="eyebrow">KUIS</span><h2>Performa Latihan</h2>
      <div class="mini-stats">
        <div><small>Riwayat jawaban</small><strong>${history.length}</strong></div>
        <div><small>Benar</small><strong>${correct}</strong></div>
        <div><small>Perlu review</small><strong>${wrongCount}</strong></div>
        <div><small>Skor terbaik</small><strong>${bestScore===null?"—":bestScore+"%"}</strong></div>
      </div>
      <p class="muted">Skor terakhir: <strong>${lastScore===null?"belum ada":lastScore+"%"}</strong></p>
    </div>
    <div class="card">
      <span class="eyebrow">REKOMENDASI</span><h2>Langkah Berikutnya</h2>
      <p>${wrongCount>0?`Ada <strong>${wrongCount}</strong> item yang perlu diulang. Review akan muncul di dalam alur belajar.`:"Belum ada item yang perlu direview. Lanjutkan materi berikutnya."}</p>
      <a class="btn primary" href="#/learn">Lanjut Belajar</a>
    </div>
  </div>`;
}

function profile(){
 const hist=state.quizHistory;
 const acc=hist.length?Math.round(hist.filter(x=>x.correct).length/hist.length*100):0;
 const mastered=Object.values(state.mastery).filter(x=>x>=70).length;

 if(!supabaseReady){
   app.innerHTML=`${header("PROFIL","Aktifkan Login Online","Frontend sudah siap untuk akun sungguhan. Hubungkan project Supabase melalui config.js.")}
   <div class="card login-card">
     <span class="badge amber">Setup diperlukan</span>
     <h2>Login online belum dihubungkan</h2>
     <p>Isi <strong>SUPABASE_URL</strong> dan <strong>SUPABASE_PUBLISHABLE_KEY</strong> pada file <strong>config.js</strong>, kemudian jalankan <strong>supabase-setup.sql</strong> di Supabase SQL Editor.</p>
   </div>
   <div class="card profile-card section">
     <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
     <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
   </div>`;
   return;
 }

 if(!authUser){
   app.innerHTML=`${header("PROFIL","Akun Peserta Belajar","Daftar atau masuk agar progres tersimpan online dan dapat digunakan di perangkat lain.")}
   <div class="profile-layout">
     <div class="card login-card">
       <div class="auth-tabs"><button class="tab active" id="loginTab">Masuk</button><button class="tab" id="registerTab">Daftar</button></div>
       <div id="authMessage" class="auth-message" aria-live="polite"></div>

       <form id="loginForm" class="login-form">
         <label>Email<input id="loginEmail" type="email" required autocomplete="email" placeholder="nama@email.com"></label>
         <label>Password<input id="loginPassword" type="password" required minlength="6" autocomplete="current-password" placeholder="Minimal 6 karakter"></label>
         <button class="btn primary" type="submit">Masuk</button>
       </form>

       <form id="registerForm" class="login-form hidden">
         <label>Nama peserta<input id="registerName" required minlength="2" autocomplete="name" placeholder="Nama lengkap"></label>
         <label>Email<input id="registerEmail" type="email" required autocomplete="email" placeholder="nama@email.com"></label>
         <label>Password<input id="registerPassword" type="password" required minlength="6" autocomplete="new-password" placeholder="Minimal 6 karakter"></label>
         <button class="btn primary" type="submit">Buat Akun</button>
       </form>
     </div>
     <div class="card profile-card">
       <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
       <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
     </div>
   </div>`;

   const loginForm=$("#loginForm"), registerForm=$("#registerForm"), msg=$("#authMessage");
   const setMode=mode=>{
     const login=mode==="login";
     $("#loginTab").classList.toggle("active",login);
     $("#registerTab").classList.toggle("active",!login);
     loginForm.classList.toggle("hidden",!login);
     registerForm.classList.toggle("hidden",login);
     msg.textContent="";
   };
   $("#loginTab").onclick=()=>setMode("login");
   $("#registerTab").onclick=()=>setMode("register");

   loginForm.onsubmit=async e=>{
     e.preventDefault();
     msg.textContent="Sedang masuk...";
     const {data,error}=await supabase.auth.signInWithPassword({
       email:$("#loginEmail").value.trim(),
       password:$("#loginPassword").value
     });
     if(error){msg.textContent=error.message;return;}
     authUser=data.user;
     await loadProgressFromCloud();
     profile();
   };

   registerForm.onsubmit=async e=>{
     e.preventDefault();
     msg.textContent="Membuat akun...";
     const name=$("#registerName").value.trim();
     const email=$("#registerEmail").value.trim();
     const password=$("#registerPassword").value;
     const {data,error}=await supabase.auth.signUp({
       email,password,
       options:{
         data:{full_name:name},
         emailRedirectTo:location.origin + location.pathname + "#/profile"
       }
     });
     if(error){msg.textContent=error.message;return;}
     if(data.session){
       authUser=data.user;
       await supabase.from("profiles").upsert({id:data.user.id,full_name:name,email});
       await syncProgressToCloud();
       profile();
     }else{
       msg.innerHTML="<strong>Akun dibuat.</strong> Cek email untuk verifikasi, lalu kembali dan masuk.";
     }
   };
 }else{
   const name=authUser.user_metadata?.full_name || "Peserta Belajar";
   app.innerHTML=`${header("PROFIL","Profil Belajar","Akun aktif dan progres belajar tersimpan online.")}
   <div class="card learner-profile">
     <div class="learner-avatar">${escapeHtml(name.trim().charAt(0).toUpperCase() || "P")}</div>
     <div><span class="badge green">● Online</span><h2>${escapeHtml(name)}</h2><p>${escapeHtml(authUser.email || "")}</p><small>Progress tersinkron ke akun ini.</small></div>
     <button class="btn outline" id="logoutBtn">Keluar</button>
   </div>
   <div class="stats-grid section">
     <div class="stat-card"><small>🔥 Streak</small><strong>${state.streak} hari</strong></div>
     <div class="stat-card"><small>⭐ XP</small><strong>${state.xp}</strong></div>
     <div class="stat-card"><small>🎯 Akurasi</small><strong>${acc}%</strong></div>
     <div class="stat-card"><small>✅ Dikuasai</small><strong>${mastered}</strong></div>
   </div>
   <div class="card profile-card section">
     <img class="profile-photo profile-photo-img" src="profile.jpg" alt="Foto Muhamad Panji, S.Pd.">
     <div><span class="badge blue">Penyusun</span><h2 style="margin-top:12px">Muhamad Panji, S.Pd.</h2><p><strong>Pendidikan</strong><br>Pendidikan Teknik Mesin<br>FPTK — Universitas Pendidikan Indonesia</p></div>
   </div>`;
   $("#logoutBtn").onclick=async()=>{
     await syncProgressToCloud();
     await supabase.auth.signOut();
     authUser=null;
     profile();
   };
 }
}

function searchSetup(){
 const dlg=$("#searchDialog"), input=$("#globalSearch"), results=$("#searchResults");
 $("#searchBtn").onclick=()=>{dlg.showModal();setTimeout(()=>input.focus(),50)};
 input.oninput=()=>{
  const q=input.value.trim().toLowerCase();
  if(!q){results.innerHTML="";return}
  const hits=[
   ...kana.map(x=>({type:"Kana",title:x.character,sub:x.romaji})),
   ...vocab.map(x=>({type:x.level+" Vocabulary",title:x.word,sub:`${x.reading} • ${x.meaning}`})),
   ...kanji.map(x=>({type:x.level+" Kanji",title:x.k,sub:`${x.meaning} • ${x.on} • ${x.kun}`})),
   ...grammar.map(x=>({type:x.level+" Grammar",title:x.pattern,sub:x.meaning}))
  ].filter(x=>(x.title+" "+x.sub).toLowerCase().includes(q)).slice(0,30);
  results.innerHTML=hits.length?hits.map(x=>`<div class="list-card"><div class="list-main"><strong class="jp">${x.title}</strong><small>${x.type} • ${x.sub}</small></div></div>`).join(""):`<div class="empty">Tidak ditemukan.</div>`;
 };
}
searchSetup();

function render(){
 try {
 document.querySelectorAll(".desktop-nav a,.mobile-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+route()));
 const r=route();
 if(r==="/home"||r==="/") home();
 else if(r==="/learning-path"||r==="/learn") learn();
 else if(r==="/learn/kana") kanaPage();
 else if(r==="/learn/kanji") kanjiPage();
 else if(r==="/learn/vocab") vocabPage();
 else if(r==="/learn/grammar") grammarPage();
 else if(r==="/learn/listening") listeningPage();
 else if(r==="/learn/reading") readingPage();
 else if(r==="/practice/kana") writing("kana");
 else if(r==="/practice/kanji") writing("kanji");
 else if(r==="/practice/hiragana-quiz") kanaQuiz("hiragana");
 else if(r==="/practice/katakana-quiz") kanaQuiz("katakana");
 else if(r==="/practice/hiragana-random") kanaEndless("hiragana");
 else if(r==="/practice/katakana-random") kanaEndless("katakana");
 else if(r==="/review") review();
 else if(r==="/progress") progress();
 else if(r==="/placement") placement();
 else if(r==="/profile") profile();
 else home();
 window.scrollTo({top:0,behavior:"smooth"});
 } catch (e) {
   console.error("Render error:", e);
   if(app) app.innerHTML = `<section class="card section"><h2>Terjadi kendala saat memuat halaman</h2><p>Aplikasi tetap aman. Muat ulang halaman atau kembali ke Home.</p><a class="btn primary" href="#/home">Kembali ke Home</a></section>`;
 }
}
window.addEventListener("hashchange",render);

async function initApp(){
  if(!supabase && supabaseReady && window.supabase?.createClient){
    try { supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY); }
    catch(e){ console.warn("Supabase tidak tersedia, lanjut guest mode.",e); }
  }
  if(supabaseReady && supabase){
    const {data}=await supabase.auth.getSession();
    authUser=data.session?.user || null;
    if(authUser) await loadProgressFromCloud();
    supabase.auth.onAuthStateChange(async (_event,session)=>{
      authUser=session?.user || null;
      if(authUser) await loadProgressFromCloud();
      render();
    });
  }
  render();
}
initApp();
