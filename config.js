let reqBody = {
	'ou': '',
	'e': '',
	'termoExato': '',
	'naoContem': '',
	'ementa': '',
	'dispositivo': '',
	'numeracaoUnica': {
		'numero': '',
		'ano': '',
		'digito': '',
		'orgao': '5',
		'tribunal': '',
		'vara': ''
	},
	'orgaosJudicantes': [],
	'ministros': [],
	'convocados': [],
	'classesProcessuais': [],
	'indicadores': [],
	'tiposDecisoes': [],
	'tipos': [
		'ACORDAO'
	],
	'orgao': 'TST',
	'publicacaoInicial': '2011-03-21',
	'publicacaoFinal': '2011-03-31',
	'julgamentoInicial': null,
	'julgamentoFinal': null
}

let reqHeaders = {
  // 'sec-fetch-mode': 'cors',
  'referer': 'https://jurisprudencia.tst.jus.br/',
  'origin': 'https://jurisprudencia.tst.jus.br',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
  'content-type': 'application/json'
}

export {
  reqBody,
  reqHeaders
}