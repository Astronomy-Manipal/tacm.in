</main>

  <div class="container">
    <footer class="py-5">
      <div class="row">
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p id="easter-egg-text">&copy; 2024 The Astronomy Club, Manipal. All rights reserved.</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
        </ul>
      </div>
    </footer>
  </div>

  <script src="<?=ROOT?>/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script>
    // Easter egg implementation
    (function() {
      const easterEggText = document.getElementById('easter-egg-text');
      let clickCount = 0;
      const maxClicks = 5;
      const redirectTimeout = 5000; // 5 seconds

      easterEggText.addEventListener('click', function() {
        clickCount++;
        if (clickCount === maxClicks) {
          alert("🎉 Woohoo! You've stumbled upon a hidden secret! 🕵‍♂\nHold tight as you’re about to be whisked away to a special place in 5 seconds... Don't bother its my portfolio😁");
          setTimeout(function() {
            window.location.href = 'https://byte-shell.vercel.app/';
          }, redirectTimeout);
        }
      });
    })();
  </script>

  </body>
</html>