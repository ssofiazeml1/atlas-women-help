(function () {
  var status = document.getElementById('status');
  var button = document.getElementById('download');

  function collect() {
    var entries = {};
    for (var i = 0; i < window.localStorage.length; i += 1) {
      var key = window.localStorage.key(i);
      if (!key || key.indexOf('atlas:') !== 0) continue;
      var raw = window.localStorage.getItem(key);
      if (raw === null) continue;
      try { entries[key] = JSON.parse(raw); }
      catch (_) { entries[key] = raw; }
    }
    return entries;
  }

  var entries = collect();
  var keys = Object.keys(entries);
  var itemCount = keys.reduce(function (sum, key) {
    var value = entries[key];
    return sum + (Array.isArray(value) ? value.length : 1);
  }, 0);

  status.textContent = keys.length
    ? 'Найдено разделов: ' + keys.length + '. Сохранённых записей: ' + itemCount + '.'
    : 'На этом устройстве для данного адреса сохранённых данных не найдено.';

  button.disabled = keys.length === 0;
  if (button.disabled) button.style.opacity = '0.45';

  button.addEventListener('click', function () {
    var payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      origin: window.location.origin,
      entries: collect()
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'atlas-women-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
}());