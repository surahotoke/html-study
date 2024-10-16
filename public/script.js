console.log("Hello world!");
let selectedElement = null; // 直前に選択した要素を保存
let selectedText = ""; // コピーしたテキストを保存

// クリックした要素を選択する関数
document.querySelectorAll("*").forEach((element) => {
  element.addEventListener("click", function (event) {
    if (event.target.closest("#context-menu")) return;
    event.stopPropagation(); // イベントのバブリングを防ぐ
    selectedElement = this; // クリックした要素を保存
    if (this.tagName === "INPUT" || this.tagName === "TEXTAREA") {
      selectedText = this.value; // 入力要素の場合はvalueを取得
    } else {
      selectedText = this.innerHTML; // テキストを取得
    }
    console.log(`選択された要素: ${selectedElement.tagName} - ${selectedText}`);

    // メニューを表示する
    const menu = document.getElementById("context-menu");
    menu.style.display = "block";
    menu.style.left = event.pageX + "px"; // マウスのX位置
    menu.style.top = event.pageY + "px"; // マウスのY位置
  });
});

// メニューの外側をクリックしたら非表示にする
document.addEventListener("click", function () {
  const menu = document.getElementById("context-menu");
  menu.style.display = "none"; // メニューを隠す
});

// コピー関数
function copy() {
  if (selectedElement) {
    navigator.clipboard.writeText(selectedText); // クリップボードにコピー
    alert(`コピーしました: ${selectedText}`);
  } else {
    alert("要素を選択してください！");
  }
}

// 切り取り関数
function cut() {
  if (selectedElement) {
    navigator.clipboard.writeText(selectedText); // クリップボードにコピー
    if (
      selectedElement.tagName === "INPUT" ||
      selectedElement.tagName === "TEXTAREA"
    ) {
      selectedElement.value = ""; // 入力要素の場合はvalueをクリア
    } else {
      selectedElement.innerHTML = ""; // 要素のテキストをクリア
    }
    alert(`切り取りました: ${selectedText}`);
    selectedElement = null; // 選択をクリア
    const menu = document.getElementById("context-menu");
    menu.style.display = "none"; // メニューを隠す
  } else {
    alert("要素を選択してください！");
  }
}

// 貼り付け関数
function paste() {
  if (selectedElement) {
    navigator.clipboard.readText().then((text) => {
      // ボタンやメニュー内のテキストは変更しない
      if (
        selectedElement.tagName === "INPUT" ||
        selectedElement.tagName === "TEXTAREA"
      ) {
        selectedElement.value = text; // 入力要素に貼り付け
      } else {
        selectedElement.innerHTML = text; // 他の要素に貼り付け
      }
      alert(`貼り付けました: ${text}`);
      const menu = document.getElementById("context-menu");
      menu.style.display = "none"; // メニューを隠す
    });
  } else {
    alert("要素を選択してください！");
  }
}
