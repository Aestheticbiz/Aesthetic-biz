(function () {
  /**
   * The leak calculator.
   *
   * Same arithmetic as aestheticbiz.site/second-visit, so the audit and the
   * landing page tell one story. The argument: what a practice can afford to
   * pay for a patient is set by how often patients come back, not by how cheap
   * its advertising is.
   *
   *   expected visits = 1 / (1 − return rate)
   *   margin per visit = first-visit value × gross margin
   *   lifetime value  = expected visits × margin per visit
   *   affordable spend = lifetime value ÷ 3   (conventional healthy ratio)
   *
   * Every figure is entered by the reader. Nothing is measured, assumed from
   * their analytics, or sent anywhere.
   */
  var TARGET = 0.45;
  var RATIO = 3;

  var ids = ['patients', 'value', 'returnRate', 'spend', 'margin'];
  var CUR = (window.AUDIT_CURRENCY || 'US$');

  function num(id) {
    var el = document.getElementById(id);
    if (!el) return 0;
    var v = parseFloat(el.value);
    return isFinite(v) && v >= 0 ? v : 0;
  }

  function money(n) {
    if (!isFinite(n)) return '—';
    return CUR + Math.round(n).toLocaleString('en-US');
  }

  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function recalc() {
    var patients = num('patients');
    var value = num('value');
    var r = Math.min(Math.max(num('returnRate'), 0), 90) / 100;
    var spend = num('spend');
    var margin = num('margin') / 100;

    var target = Math.max(TARGET, r);
    var atTarget = target <= r;

    var marginPerVisit = value * margin;
    var visitsNow = 1 / (1 - r);
    var visitsTarget = 1 / (1 - target);

    var cac = patients > 0 ? spend / patients : 0;
    var ltvNow = visitsNow * marginPerVisit;
    var ltvTarget = visitsTarget * marginPerVisit;

    var affordNow = ltvNow / RATIO;
    var affordTarget = ltvTarget / RATIO;
    var gap = (visitsTarget - visitsNow) * value * (patients * 12);

    set('leakLabel', atTarget
      ? 'Your patients already return well. Across the relationship, one of them is worth'
      : 'On a year of new patients, the gap between this return rate and ' +
        Math.round(target * 100) + '% is worth');
    set('leakFigure', money(atTarget ? ltvNow : gap));
    set('leakSub', atTarget
      ? 'That is the number worth defending.'
      : 'Same patients. Same marketing spend. Same rooms.');

    set('affordNow', money(affordNow));
    set('affordTarget', money(affordTarget));
    set('affordTargetNote', 'at a ' + Math.round(target * 100) + '% return rate');

    var read = document.getElementById('affordRead');
    if (read) {
      if (atTarget) {
        read.style.display = 'none';
      } else {
        read.style.display = '';
        var uplift = affordNow > 0 ? Math.round((affordTarget / affordNow - 1) * 100) : 0;
        read.textContent =
          'That is ' + uplift + '% more than can be bid today for exactly the same patient. ' +
          'Whoever in this market can pay the most wins it — and that capacity is decided by ' +
          'the second visit, not by the ad account.';
      }
    }

    set('mCac', money(cac));
    set('mLtv', money(ltvNow));
    set('mRatio', cac > 0 ? (ltvNow / cac).toFixed(1) + ' : 1' : 'no spend entered');
    set('mPayback', marginPerVisit > 0 ? (cac / marginPerVisit).toFixed(1) : '—');
    set('mVisitsNow', visitsNow.toFixed(1));
    set('mVisitsTarget', visitsTarget.toFixed(1));
  }

  ids.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', recalc);
    el.addEventListener('change', recalc);
  });

  recalc();
})();
