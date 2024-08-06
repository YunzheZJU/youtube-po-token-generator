const bOa$ = bOa
bOa = (...args) => {
  const ret = bOa$(...args)
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
g.C_.create(
  document.getElementById('player'),
  { args: {}, attrs: {}, loaded: true },
  ytcfg.get('WEB_PLAYER_CONTEXT_CONFIGS')['WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER'],
)
