    // Starfield
    const c = document.getElementById("stars");
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    let starColor = "#fff";
    let glowColor = "#00d4ff";
    let stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.5 });
    }
    let mouse = { x: c.width / 2, y: c.height / 2 };
    document.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = starColor;
      ctx.shadowBlur = 5;
      ctx.shadowColor = glowColor;
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        let dx = (mouse.x - c.width / 2) * 0.01;
        let dy = (mouse.y - c.height / 2) * 0.01;
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function move() {
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        s.y -= 0.2;
        if (s.y <= 0) {
          s.y = c.height;
          s.x = Math.random() * c.width;
        }
      }
    }
    function animate() {
      draw();
      move();
      requestAnimationFrame(animate);
    }
    animate();

    // Typing effect for tagline
    function typeEffect(element, speed) {
      const text = element.innerHTML;
      element.innerHTML = "";
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }
    window.onload = function() {
      const tagline = document.getElementById('tagline');
      typeEffect(tagline, 75);
      const themeToggle = document.getElementById('theme-toggle');
      const themeMenu = document.getElementById('theme-menu');

      const themeSettings = {
        default: {class: '', star: '#fff', glow: '#00d4ff'},
        blackhole: {class: 'blackhole', star: '#a020f0', glow: '#a020f0'},
        midnight: {class: 'midnight', star: '#89cff0', glow: '#003366'},
        sunset: {class: 'sunset', star: '#ffdd33', glow: '#ff4500'},
        matrix: {class: 'matrix', star: '#00ff00', glow: '#00ff00'}
      };

      function applyTheme(name) {
        document.body.className = themeSettings[name].class;
        starColor = themeSettings[name].star;
        glowColor = themeSettings[name].glow;
        themeMenu.classList.remove('show');
        themeToggle.classList.remove('active');
        themeToggle.classList.add('changed');
        setTimeout(() => themeToggle.classList.remove('changed'), 400);
      }

      themeToggle.addEventListener('click', function() {
        themeToggle.classList.toggle('active');
        themeMenu.classList.toggle('show');
      });

      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
      });
    }

    // Terminal logic
    const terminal = document.getElementById("console-output");
    const input = document.getElementById("console-input");
    const container = document.getElementById("console-container");

    const commands = {
      help: `Available commands: help SHIFT+CTRL+E TO CLOSE`,
      index: `Opening Index...`,
      move: `Opening Move...`,
      showed: `Opening Showed...`,
      share: `Opening Share...`,
      "sudo rm -rf /": "Nice try Ethan, but I'm immortal.",
      coffee: "☕ Coffee brewed successfully. Enjoy!",
      star: "⭐ Sending a star to your GitHub..."
    };

    let consoleTimeout;

    function startConsoleTimeout() {
      clearTimeout(consoleTimeout);
      consoleTimeout = setTimeout(() => {
        container.classList.remove("show");
      }, 5000);
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        appendLine(`ethan@cloud:~$ ${cmd}`);
        if (cmd === "clear") {
          terminal.innerHTML = "";
        } else if (commands[cmd]) {
          appendLine(commands[cmd]);
          startConsoleTimeout();
        } else {
          appendLine(`'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`);
        }
        input.value = "";
        terminal.scrollTop = terminal.scrollHeight;
      }
    });

    function appendLine(text) {
      terminal.innerHTML += `<div>${text}</div>`;
    }

    // Toggle console with Ctrl + Shift + E
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        if (container.classList.contains("show")) {
          container.classList.remove("show");
          clearTimeout(consoleTimeout);
        } else {
          container.classList.add("show");
          startConsoleTimeout();
          const tips = ["Type 'help' for commands", "Try 'coffee' or 'star'", "Feeling lucky?"];
          appendLine("💡 " + tips[Math.floor(Math.random()*tips.length)]);
          setTimeout(() => input.focus(), 100);
        }
      }
    });
