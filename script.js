//問題の設定
const qa = new Array();
qa[0] = ["イルカを漢字で書くとどれ？","海豚","海牛","河豚",1]; //問題文, 選択肢1, 選択肢2, 選択肢3, 正解
qa[1] = ["クラゲを漢字で書くとどれ？","水浮","水母","水星",2];
qa[2] = ["カタツムリを漢字で書くとどれ？","禍牛","鍋牛","蝸牛",3];
qa[3] = ["バッタを漢字で書くとどれ？","飛蝗","飛蟻","飛脚",1];
qa[4] = ["タツノオトシゴを英語にするとどれ？","sea fish","sea horse","sea dragon",2];
qa[5] = ["マグロを英語にするとどれ？","funa","suna","tuna",3];
qa[6] = ["トンボを英語にするとどれ？","fly","dragonfly","butterfly",2];
qa[7] = ["ヒトデを英語にするとどれ？","starfish","starshell","starmine",1];
qa[8] = ["恒星の中で最も明るい星は？","デネブ","スピカ","シリウス",3];
qa[9] = ["惑星の中で最も重たいのはどれ？","太陽","木星","天王星",2];

//初期設定
const q_sel = 3; //選択肢の数
let count; //問題番号
let score; //総合得点
let yours = new Array(); //解答記録
setReady();

// 初期設定
function setReady() {
  count = 0;
  score = 0;
  window.scrollTo(0,0); //ページの最上部にスクロール
  document.getElementById("score").classList.remove("decoration"); // decorationクラスがあれば削除
  document.getElementById("header").innerText = "";
  document.getElementById("text_s").innerHTML = "";
  document.getElementById("score").innerText = "";
  document.getElementById("checkResult").innerHTML = "";
  quiz(); //最初の問題
  alert("クイズは全" + qa.length + "問です。開始します！");
}

// 出題
function quiz() {
  //問題文
	document.getElementById("count").innerHTML = "第" + (count + 1) + "問";
	document.getElementById("text_q").innerHTML = qa[count][0];
	//選択肢
	let s = "";
	for (let n=1; n<=q_sel; n++) {
    s += "<button type='button' onclick='anser(" + n + ")'>" + n + "：" + qa[count][n] + "</button>"; //aタグからjavascriptを実行 <a href="javascript:function1();"
	}
	document.getElementById("text_s").innerHTML = s;
}

// 解答表示
function anser(num) {
	//答え合わせ
	if (num == qa[count][q_sel + 1]) {
		//正解
    yours[count] = "<span class='red'>○</span>【" + qa[count][num] + "】";
    score++;
	} else {
    //不正解
    yours[count] = "<span class='red'>×</span>【" + qa[count][num] + "】 (正解: " + qa[count][(qa[count][q_sel + 1])] + ")";
	}
	//次の問題を表示
	count++;
  if (count < qa.length) {
	  quiz();
  } else {
    //全問終了
    document.getElementById("count").innerHTML = "全問終了。お疲れ様でした！";
    checkResult();
		document.getElementById("text_q").innerHTML = "";
		document.getElementById("text_s").innerHTML = "<a href='javascript:setReady()'>もう一度やり直す</a>";
	}
}

// 結果表示
function checkResult() {
  document.getElementById("header").innerText = "結果";
  document.getElementById("score").classList.add("decoration"); // decorationクラスを追加
  document.getElementById("score").innerText = Math.floor(score / qa.length * 100) + " 点";
  let  result = "";
  for(let i=0; i<qa.length; i++) {
    let tr = "<tr>第" + (i + 1) + "問：" + qa[i][0] + "</tr>";
    tr += "<tr>&emsp; " + qa[i][1] + "、" + qa[i][2] + "、" + qa[i][3] + "</tr>";
    tr += "<tr>&emsp;" + yours[i] + "</tr>";
    tr += "<tr>&emsp;</tr>";
    result += tr;
  }
  document.getElementById("checkResult").innerHTML = result;
}