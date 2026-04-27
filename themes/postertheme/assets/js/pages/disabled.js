document.addEventListener('keydown', function (e) {

    // Block F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Block Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.code === "KeyI") {
        e.preventDefault();
    }

    // ✅ Block Ctrl+Shift+C (FIXED)
    if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
        e.preventDefault();
    }

    // Block Ctrl+U
    if (e.ctrlKey && e.code === "KeyU") {
        e.preventDefault();
    }

    // Block Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.code === "KeyJ") {
        e.preventDefault();
    }

    // Block Ctrl+S
    if (e.ctrlKey && e.code === "KeyS") {
        e.preventDefault();
    }

    // Block Ctrl+Shift+S
    if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
        e.preventDefault();
    }
});

// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
    // Disable drag functionality
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });