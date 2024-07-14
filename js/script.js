// JavaScript básico para efecto de desplazamiento suave

// Función para el desplazamiento suave al hacer clic en un enlace de navegación
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var ease = Math.easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Función de curva de aceleración (EaseInOutQuad)
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
}

// Asignar la función de desplazamiento suave a los enlaces de navegación
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.navigation a');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000); // Duración del desplazamiento en milisegundos (ej. 1000 = 1 segundo)
        });
    });
});
