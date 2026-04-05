// query.js — Send Query → Bookings

(function () {
  var API = (function(){
    var h = window.location.hostname;
    return (!h || h === 'localhost' || h === '127.0.0.1')
      ? 'http://localhost:5000/api'
      : 'https://devbhoomi-travels.onrender.com/api';
  })();

  function showToast(msg, ok) {
    var t = document.getElementById("qToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "qToast";
      t.style.cssText = "position:fixed;bottom:2rem;right:2rem;z-index:99999;padding:1rem 1.5rem;border-radius:12px;color:#fff;font-size:.92rem;font-weight:600;max-width:320px;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:all .3s;transform:translateY(100px);opacity:0";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.background = ok ? "#2d6a4f" : "#c0392b";
    t.style.transform = "translateY(0)"; t.style.opacity = "1";
    clearTimeout(t._timer);
    t._timer = setTimeout(function(){ t.style.transform="translateY(100px)"; t.style.opacity="0"; }, 3500);
  }

  document.addEventListener("DOMContentLoaded", function () {

    var btnSend = document.querySelector(".btn-send");
    if (btnSend) {
      btnSend.addEventListener("click", function () {
        var inputs = document.querySelectorAll(".form-grid input, .form-grid textarea");
        var name    = inputs[0] ? inputs[0].value.trim() : "";
        var email   = inputs[1] ? inputs[1].value.trim() : "";
        var phone   = inputs[2] ? inputs[2].value.trim() : "";
        var persons = inputs[3] ? inputs[3].value.trim() : "1";
        var date    = inputs[4] ? inputs[4].value.trim() : "";
        var msg     = inputs[5] ? inputs[5].value.trim() : "";

        if (!name)                                              { showToast("Apna naam likhein", false); return; }
        if (!phone || phone.replace(/[^0-9]/g,"").length < 10) { showToast("Valid phone likhein", false); return; }

        var pkgName = document.title.replace(/\s*[-—]\s*DevBhoomi Travels/gi,"").replace(/\s*[-—]\s*Devbhoomi Travels/gi,"").trim();
        var orig = btnSend.textContent;
        btnSend.textContent = "Bhej raha hoon...";
        btnSend.disabled = true;

        fetch(API + "/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageName:     pkgName,
            packageKey:      '',
            packagePrice:    '',
            name:            name,
            email:           email,
            phone:           phone,
            travelDate:      date,
            persons:         parseInt(persons) || 1,
            totalAmount:     0,
            gstAmount:       0,
            finalAmount:     0,
            specialRequests: msg || "",
            source:          "package-page",
            bookingType:     "Package"
          })
        })
        .then(function(r){ return r.json(); })
        .then(function(data) {
          btnSend.disabled = false;
          if (data.success) {
            showToast("✅ Booking query bhej di! Booking ID: " + (data.bookingId||'') + " — Team call karegi 📞", true);
            btnSend.textContent = "✅ Query Sent!";
            btnSend.style.background = "#2d6a4f";
            btnSend.style.color = "#fff";
            inputs.forEach(function(i){ i.value = ""; });
            setTimeout(function(){
              btnSend.textContent = orig;
              btnSend.style.background = "";
              btnSend.style.color = "";
            }, 3000);
          } else {
            showToast(data.message || "Error aayi.", false);
            btnSend.textContent = orig;
          }
        })
        .catch(function() {
          showToast("❌ Server se connect nahi hua. WhatsApp pe contact karein: +91 94105 82310", false);
          btnSend.textContent = orig;
          btnSend.disabled = false;
        });
      });
    }

    // Sticky btn-query → scroll to form
    document.querySelectorAll(".btn-query").forEach(function(btn){
      btn.addEventListener("click", function(){
        var form = document.querySelector(".booking-wrap") || document.querySelector(".booking-card") || document.querySelector(".form-grid");
        if (form) {
          form.scrollIntoView({ behavior:"smooth", block:"center" });
          setTimeout(function(){ var f=document.querySelector(".form-grid input"); if(f) f.focus(); }, 600);
        }
      });
    });

  });
})();
