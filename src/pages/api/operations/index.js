import NextCors from 'nextjs-cors';

const handler = async (req, res) => {

  const { body, method } = req;

  await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if(method === 'POST') {
    const { valor1, valor2 } = body;
    let sumar = parseInt(valor1) + parseInt(valor2);
    return res.status(200).json({ sumar });
  } else {
    return res.status(500).json('Not support metodo');
  }
}

export default handler;