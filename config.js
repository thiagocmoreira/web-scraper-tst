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
	'publicacaoInicial': '2010-01-01',
	'publicacaoFinal': '2020-01-01',
	'julgamentoInicial': null,
	'julgamentoFinal': null
}

let reqHeaders = {
  'cookie': '3977a58e7c486c0c3bdbfa73b78f86d7=c4c4586d0c0e5e492e848d6acb94f74c; INSTANCIA=jurisprudencia-backend',
  'sec-fetch-mode': 'cors',
  'referer': 'https://jurisprudencia.tst.jus.br/',
  'origin': 'https://jurisprudencia.tst.jus.br',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
  'content-type': 'application/json'
}

export {
  reqBody,
  reqHeaders
}