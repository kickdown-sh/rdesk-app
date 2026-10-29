// Cena de abertura da direção "Duas telas": o ID é digitado aqui, o pedido chega lá,
// o mesmo código aparece nas duas metades e, depois do Aceitar, a faixa laranja acende.
// Só roda com movimento permitido (classe .movimento no <html>). Sem JS ou com movimento
// reduzido, a cena fica parada no pedido, que é um estado coerente: ninguém aceitou ainda.
(function () {
  if (!document.documentElement.classList.contains('movimento')) return;
  var cena = document.getElementById('topo');
  var digitado = cena && cena.querySelector('.digitado');
  if (!digitado) return;

  var completo = digitado.getAttribute('data-texto');
  var t = 500;
  for (var i = 1; i <= completo.length; i++) {
    (function (n) { setTimeout(function () { digitado.textContent = completo.slice(0, n); }, t); })(i);
    t += completo.charAt(i - 1) === ' ' ? 40 : 95;
  }
  function estado(nome, ms) { setTimeout(function () { cena.setAttribute('data-estado', nome); }, ms); }
  setTimeout(function () { cena.setAttribute('data-estado', 'enviado'); cena.classList.add('correndo'); }, t + 300);
  estado('pedido', t + 1100);
  estado('aceitando', t + 3600);
  estado('acessado', t + 4000);

  // na seção de segurança, os bytes da costura andam uma vez quando ela aparece
  var sig = document.getElementById('seguranca');
  if (sig && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { sig.classList.add('ativo'); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(sig);
  }
})();
