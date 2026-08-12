(function () {
  var ids = ['visitors', 'curRate', 'bookRate', 'attend', 'value'];
  var scenarios = [
    { rate: 2.0, out: 'o1', label: 'r1', pat: 'p1' },
    { rate: 2.5, out: 'o2', label: 'r2', pat: 'p2' },
    { rate: 3.0, out: 'o3', label: 'r3', pat: 'p3' }
  ];

  function num(id) {
    var v = parseFloat(document.getElementById(id).value);
    return isFinite(v) && v >= 0 ? v : 0;
  }

  function money(n) {
    return 'US$' + Math.round(n).toLocaleString('en-US');
  }

  function recalc() {
    var visitors = num('visitors');
    var cur = num('curRate') / 100;
    var book = num('bookRate') / 100;
    var attend = num('attend') / 100;
    var value = num('value');

    var currentEnq = visitors * cur;
    document.getElementById('w1').textContent =
      visitors.toLocaleString('en-US') + ' × ' + (cur * 100).toFixed(1) + '% = ' +
      currentEnq.toFixed(1) + ' enquiries / month';

    scenarios.forEach(function (s) {
      // Only the proposed rate varies; a proposal below current shows nothing
      // rather than a negative, which would be meaningless here.
      var proposed = Math.max(s.rate / 100, cur);
      var improvedEnq = visitors * proposed;
      var addEnq = Math.max(improvedEnq - currentEnq, 0);
      var addAttended = addEnq * book * attend;
      var revenue = addAttended * value;

      document.getElementById(s.label).textContent = (proposed * 100).toFixed(1) + '%';
      document.getElementById(s.out).textContent = money(revenue);
      document.getElementById(s.pat).textContent =
        addAttended.toFixed(1) + ' additional attended patients · ' +
        money(revenue * 12) + ' over twelve months';
    });
  }

  ids.forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', recalc);
    el.addEventListener('change', recalc);
  });

  recalc();
})();
