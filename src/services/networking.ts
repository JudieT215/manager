import { API_ROOT } from 'src/constants';
import Request, { setURL, setMethod, setData } from './index';

export const updateIP = (address: string, payload: any) =>
  Request<Linode.IPAddress>(
    setURL(`${API_ROOT}/networking/ips/${address}`),
    setData(payload),
    setMethod('PUT'),
  )
    .then(response => response.data);
