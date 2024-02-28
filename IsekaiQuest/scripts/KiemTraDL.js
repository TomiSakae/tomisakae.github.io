if (localStorage.getItem("ten_nv") != null) {
    window.location.replace("TrangChu/TrangChu.html");
}
else {
    window.location.replace("IsekaiQuest.html");
    localStorage.setItem("csdl", 0);
}