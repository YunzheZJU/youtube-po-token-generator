const X_a$ = X_a
X_a = (...args) => {
  const ret = X_a$(...args)
  if (ret.length > 80) {
    window.onPoToken(ret)
  }
  return ret
}
ytcfg.set({
  'INNERTUBE_CONTEXT': {
    ...ytcfg.get('INNERTUBE_CONTEXT'),
    client: {
      ...ytcfg.get('INNERTUBE_CONTEXT').client,
      visitorData: window.visitorData,
    },
  },
  'VISITOR_DATA': window.visitorData,
  'IDENTITY_MEMENTO': {
    'visitor_data': window.visitorData,
  },
})
g.V_.create(
  document.getElementById('player'),
  { args: {}, attrs: {}, loaded: true },
  ytcfg.get('WEB_PLAYER_CONTEXT_CONFIGS')['WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER'],
)
