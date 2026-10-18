const $ = id => document.getElementById(id);
$('make').addEventListener('click', () => {
  const idea = $('idea').value.trim();
  if (!idea) { $('notice').textContent = 'اكتب فكرة الفيديو أولًا.'; $('idea').focus(); return; }
  const prompt = `Create a polished ${$('style').value} video.\nConcept: ${idea}\nAspect ratio: ${$('ratio').value}. Suggested duration: ${$('length').value}.\nDialogue language: ${$('language').value}.\nAdditional direction: ${$('details').value.trim() || 'clear subject, expressive motion, smooth camera movement, coherent scene, vivid colors, professional lighting'}.\nQuality: detailed subject, consistent character design, natural motion, clean composition, no flicker, no distorted faces or extra limbs, no unwanted text or watermark. Make the action readable from beginning to end.`;
  $('output').value = prompt;
  $('notice').textContent = 'تم تجهيز البرومبت. انسخه وافتح إحدى الخدمات الخارجية لتجربة التوليد.';
});
$('copy').addEventListener('click', async () => {
  const text = $('output').value;
  if (!text) { $('notice').textContent = 'جهّز البرومبت أولًا.'; return; }
  try { await navigator.clipboard.writeText(text); $('notice').textContent = 'تم نسخ البرومبت.'; }
  catch { $('output').focus(); $('output').select(); document.execCommand('copy'); $('notice').textContent = 'تم تحديد النص؛ إذا لم يُنسخ تلقائيًا اختر نسخ من القائمة.'; }
});
$('save').addEventListener('click', () => {
  if (!$('output').value) { $('notice').textContent = 'جهّز البرومبت أولًا.'; return; }
  const blob = new Blob([$('output').value], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'worm-ai-video-prompt.txt'; a.click(); URL.revokeObjectURL(url);
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
