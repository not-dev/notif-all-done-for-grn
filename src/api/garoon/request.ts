import axios from 'axios'
import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc'

type SOAPParams = {
  action: string,
  parameters: string
}

type SOAPResponse = {
  status: number
  request: {
    response: string
  }
}

type HttpResponse<T=string|Record<string, unknown>> = {
  statusCode: number,
  body: T
}

type GrnHttpResponse = Omit<HttpResponse, 'body'> & {
  body: {
    returns?: Element
  }
}

const makeRequestXML = (soapParams: SOAPParams) => {
  const template = `\
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header>
      <Action>%ACTION%</Action>
      <Security>
        <UsernameToken>
          <Username></Username>
          <Password></Password>
        </UsernameToken>
      </Security>
      <Timestamp>
        <Created>%CREATED%</Created>
        <Expires>%EXPIRES%</Expires>
      </Timestamp>
      <Locale>jp</Locale>
  </soap:Header>
  <soap:Body>
    <%ACTION%>
      %PARAMETERS%
    </%ACTION%>
  </soap:Body>
</soap:Envelope>
`

  // dayjs.extend(window.dayjs_plugin_utc)
  dayjs.extend(utcPlugin)
  const now = dayjs().utc().format()
  const expires = dayjs().add(1, 'month').utc().format()

  const xmls = template
    .replaceAll('%ACTION%', soapParams.action)
    .replaceAll('%PARAMETERS%', soapParams.parameters)
    .replaceAll('%CREATED%', now)
    .replaceAll('%EXPIRES%', expires)

  return xmls
}

const postRequest = async (url:string, soapParams: SOAPParams):Promise<GrnHttpResponse> => {
  console.log(soapParams)
  const xmls = makeRequestXML(soapParams)
  console.log(location.origin + url)
  const res: SOAPResponse = await axios.post(location.origin + url,
    xmls,
    {
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8'
      }
    })
  const statusCode = res.status
  const xmlStr = res.request.response
  const parser = new DOMParser()
  const dom = parser.parseFromString(xmlStr, 'application/xml')
  const returns = dom.getElementsByTagName('returns')[0]
  return returns ? { statusCode, body: { returns } } : { statusCode: 500, body: {} }
}

const getRestRequest = async <T=Record<string, unknown>>(url:string, params?: Record<string, unknown>):Promise<HttpResponse<T|undefined>> => {
  console.log(location.origin + url)
  const res = await axios.get<T>(location.origin + url,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      params
    })
  const statusCode = res.status
  const data = res.data
  return res ? { statusCode, body: data } : { statusCode: 500, body: undefined }
}

export { postRequest, GrnHttpResponse, HttpResponse, getRestRequest }
