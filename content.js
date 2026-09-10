
export const kana = [
  ..."あ:a,い:i,う:u,え:e,お:o,か:ka,き:ki,く:ku,け:ke,こ:ko,さ:sa,し:shi,す:su,せ:se,そ:so,た:ta,ち:chi,つ:tsu,て:te,と:to,な:na,に:ni,ぬ:nu,ね:ne,の:no,は:ha,ひ:hi,ふ:fu,へ:he,ほ:ho,ま:ma,み:mi,む:mu,め:me,も:mo,や:ya,ゆ:yu,よ:yo,ら:ra,り:ri,る:ru,れ:re,ろ:ro,わ:wa,を:wo,ん:n".split(",").map(x=>{const [character,romaji]=x.split(":");return {type:"hiragana",group:"basic",character,romaji}}),
  ..."が:ga,ぎ:gi,ぐ:gu,げ:ge,ご:go,ざ:za,じ:ji,ず:zu,ぜ:ze,ぞ:zo,だ:da,ぢ:ji,づ:zu,で:de,ど:do,ば:ba,び:bi,ぶ:bu,べ:be,ぼ:bo".split(",").map(x=>{const [character,romaji]=x.split(":");return {type:"hiragana",group:"dakuten",character,romaji}}),
  ..."ぱ:pa,ぴ:pi,ぷ:pu,ぺ:pe,ぽ:po".split(",").map(x=>{const [character,romaji]=x.split(":");return {type:"hiragana",group:"handakuten",character,romaji}}),
  ..."きゃ:kya,きゅ:kyu,きょ:kyo,しゃ:sha,しゅ:shu,しょ:sho,ちゃ:cha,ちゅ:chu,ちょ:cho,にゃ:nya,にゅ:nyu,にょ:nyo,ひゃ:hya,ひゅ:hyu,ひょ:hyo,みゃ:mya,みゅ:myu,みょ:myo,りゃ:rya,りゅ:ryu,りょ:ryo".split(",").map(x=>{const [character,romaji]=x.split(":");return {type:"hiragana",group:"yoon",character,romaji}}),
  ..."ア:a,イ:i,ウ:u,エ:e,オ:o,カ:ka,キ:ki,ク:ku,ケ:ke,コ:ko,サ:sa,シ:shi,ス:su,セ:se,ソ:so,タ:ta,チ:chi,ツ:tsu,テ:te,ト:to,ナ:na,ニ:ni,ヌ:nu,ネ:ne,ノ:no,ハ:ha,ヒ:hi,フ:fu,ヘ:he,ホ:ho,マ:ma,ミ:mi,ム:mu,メ:me,モ:mo,ヤ:ya,ユ:yu,ヨ:yo,ラ:ra,リ:ri,ル:ru,レ:re,ロ:ro,ワ:wa,ヲ:wo,ン:n".split(",").map(x=>{const [character,romaji]=x.split(":");return {type:"katakana",group:"basic",character,romaji}})
];

export const vocab = [
 {word:"学校",reading:"がっこう",romaji:"gakkou",meaning:"sekolah",level:"N5",category:"School"},
 {word:"学生",reading:"がくせい",romaji:"gakusei",meaning:"pelajar / mahasiswa",level:"N5",category:"School"},
 {word:"先生",reading:"せんせい",romaji:"sensei",meaning:"guru",level:"N5",category:"School"},
 {word:"日本",reading:"にほん",romaji:"nihon",meaning:"Jepang",level:"N5",category:"Places"},
 {word:"食べる",reading:"たべる",romaji:"taberu",meaning:"makan",level:"N5",category:"Daily Life"},
 {word:"飲む",reading:"のむ",romaji:"nomu",meaning:"minum",level:"N5",category:"Daily Life"},
 {word:"行く",reading:"いく",romaji:"iku",meaning:"pergi",level:"N5",category:"Travel"},
 {word:"見る",reading:"みる",romaji:"miru",meaning:"melihat",level:"N5",category:"Daily Life"},
 {word:"今日",reading:"きょう",romaji:"kyou",meaning:"hari ini",level:"N5",category:"Time"},
 {word:"明日",reading:"あした",romaji:"ashita",meaning:"besok",level:"N5",category:"Time"},
 {word:"電車",reading:"でんしゃ",romaji:"densha",meaning:"kereta",level:"N5",category:"Transportation"},
 {word:"会社",reading:"かいしゃ",romaji:"kaisha",meaning:"perusahaan",level:"N5",category:"Work"},
 {word:"必要",reading:"ひつよう",romaji:"hitsuyou",meaning:"perlu / diperlukan",level:"N4",category:"Daily Life"},
 {word:"準備",reading:"じゅんび",romaji:"junbi",meaning:"persiapan",level:"N4",category:"Activities"},
 {word:"経験",reading:"けいけん",romaji:"keiken",meaning:"pengalaman",level:"N4",category:"Work"},
 {word:"説明",reading:"せつめい",romaji:"setsumei",meaning:"penjelasan",level:"N4",category:"School"},
 {word:"予定",reading:"よてい",romaji:"yotei",meaning:"rencana / jadwal",level:"N4",category:"Time"},
 {word:"最近",reading:"さいきん",romaji:"saikin",meaning:"akhir-akhir ini",level:"N4",category:"Time"},
 {word:"環境",reading:"かんきょう",romaji:"kankyou",meaning:"lingkungan",level:"N3",category:"Society"},
 {word:"技術",reading:"ぎじゅつ",romaji:"gijutsu",meaning:"teknologi / keterampilan teknis",level:"N3",category:"Technology"},
 {word:"関係",reading:"かんけい",romaji:"kankei",meaning:"hubungan / relasi",level:"N3",category:"Society"},
 {word:"影響",reading:"えいきょう",romaji:"eikyou",meaning:"pengaruh",level:"N3",category:"Society"},
 {word:"改善",reading:"かいぜん",romaji:"kaizen",meaning:"perbaikan",level:"N3",category:"Work"},
 {word:"生産",reading:"せいさん",romaji:"seisan",meaning:"produksi",level:"N3",category:"Work"}
];

export const kanji = [
 {k:"日",meaning:"hari / matahari",on:"ニチ・ジツ",kun:"ひ・か",strokes:4,radical:"日",level:"N5",examples:["日本","今日"]},
 {k:"本",meaning:"buku / asal",on:"ホン",kun:"もと",strokes:5,radical:"木",level:"N5",examples:["日本","本"]},
 {k:"学",meaning:"belajar",on:"ガク",kun:"まなぶ",strokes:8,radical:"子",level:"N5",examples:["学生","学校"]},
 {k:"校",meaning:"sekolah",on:"コウ",kun:"—",strokes:10,radical:"木",level:"N5",examples:["学校"]},
 {k:"食",meaning:"makan / makanan",on:"ショク",kun:"たべる",strokes:9,radical:"食",level:"N5",examples:["食べる"]},
 {k:"電",meaning:"listrik",on:"デン",kun:"—",strokes:13,radical:"雨",level:"N5",examples:["電車"]},
 {k:"会",meaning:"bertemu / perkumpulan",on:"カイ",kun:"あう",strokes:6,radical:"人",level:"N5",examples:["会社"]},
 {k:"社",meaning:"perusahaan / kuil Shinto",on:"シャ",kun:"やしろ",strokes:7,radical:"示",level:"N5",examples:["会社"]},
 {k:"経",meaning:"melewati / mengelola",on:"ケイ・キョウ",kun:"へる",strokes:11,radical:"糸",level:"N4",examples:["経験"]},
 {k:"験",meaning:"uji / pengalaman",on:"ケン・ゲン",kun:"—",strokes:18,radical:"馬",level:"N4",examples:["経験"]},
 {k:"環",meaning:"lingkar / lingkungan",on:"カン",kun:"—",strokes:17,radical:"玉",level:"N3",examples:["環境"]},
 {k:"境",meaning:"batas / keadaan",on:"キョウ・ケイ",kun:"さかい",strokes:14,radical:"土",level:"N3",examples:["環境"]},
 {k:"技",meaning:"teknik / keterampilan",on:"ギ",kun:"わざ",strokes:7,radical:"手",level:"N3",examples:["技術"]},
 {k:"術",meaning:"teknik / seni",on:"ジュツ",kun:"すべ",strokes:11,radical:"行",level:"N3",examples:["技術"]}
];

export const grammar = [
 {pattern:"です",meaning:"adalah / bentuk sopan",level:"N5",formation:"Noun + です",example:"私は学生です。",translation:"Saya adalah pelajar."},
 {pattern:"は",meaning:"penanda topik",level:"N5",formation:"Topic + は + information",example:"私はインドネシア人です。",translation:"Saya orang Indonesia."},
 {pattern:"を",meaning:"penanda objek langsung",level:"N5",formation:"Object + を + Verb",example:"パンを食べます。",translation:"Saya makan roti."},
 {pattern:"～たい",meaning:"ingin melakukan",level:"N5",formation:"Verb ます → hilangkan ます + たい",example:"日本へ行きたいです。",translation:"Saya ingin pergi ke Jepang."},
 {pattern:"～ながら",meaning:"sambil melakukan",level:"N4",formation:"Verb stem + ながら",example:"音楽を聞きながら勉強します。",translation:"Belajar sambil mendengarkan musik."},
 {pattern:"～そうです",meaning:"kelihatannya / tampaknya",level:"N4",formation:"Stem / adjective + そうです",example:"この料理はおいしそうです。",translation:"Masakan ini kelihatannya enak."},
 {pattern:"～ために",meaning:"untuk / demi",level:"N3",formation:"Verb dictionary + ために",example:"日本で働くために、日本語を勉強しています。",translation:"Saya belajar bahasa Jepang untuk bekerja di Jepang."},
 {pattern:"～によって",meaning:"oleh / tergantung pada / melalui",level:"N3",formation:"Noun + によって",example:"人によって考え方が違います。",translation:"Cara berpikir berbeda tergantung orangnya."}
];

export const readings = [
 {title:"はじめての学校",level:"N5",text:"私は毎朝七時に起きます。八時に学校へ行きます。学校で日本語を勉強します。先生はとても親切です。",translation:"Saya bangun pukul tujuh setiap pagi. Pukul delapan saya pergi ke sekolah. Di sekolah saya belajar bahasa Jepang. Guru saya sangat baik."},
 {title:"仕事の予定",level:"N4",text:"来週、新しい仕事が始まります。仕事の前に必要な準備をして、予定を確認します。分からないことがあれば、先輩に聞きます。",translation:"Minggu depan pekerjaan baru dimulai. Sebelum bekerja saya melakukan persiapan yang diperlukan dan memeriksa jadwal. Jika ada yang tidak dimengerti, saya bertanya kepada senior."},
 {title:"技術と環境",level:"N3",text:"新しい技術は私たちの生活を便利にします。しかし、環境への影響も考える必要があります。生産方法を改善することは、会社にとって大切な課題です。",translation:"Teknologi baru membuat hidup kita lebih nyaman. Namun kita juga perlu memikirkan dampaknya terhadap lingkungan. Memperbaiki metode produksi adalah tantangan penting bagi perusahaan."}
];
