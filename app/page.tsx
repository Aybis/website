'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import { sha256 } from 'js-sha256';
import Checkbox from '@/src/components/Checkbox';
import { CopyIcon } from '@sanity/icons';

const Page: NextPage = () => {
  const apiKey = 'H4cSlLDPD0KV';
  const secret = '3YS2PKiI9yQflnwmpsqZQArgIshXmkQUfgV';
  // const baseUrl = 'https://dev.openapi.ayopop.id/api/';
  const [result, setresult] = useState();
  const [selectVersion, setselectVersion] = useState<any>({});
  const [selectTransaction, setselectTransaction] = useState<any>({});
  const [loading, setloading] = useState(false);

  const listTransaction = [
    {
      id: 'check',
      name: 'Check',
      value: 'check',
    },
    {
      id: 'payment',
      name: 'Pay',
      value: 'payment',
    },
    {
      id: 'status',
      name: 'Status',
      value: 'status',
    },
  ];

  const [params, setparams] = useState<any>({
    check: {
      partnerId: 'H4cSlLDPD0KV',
      accountNumber: '',
      productCode: '',
    },
    payment: {
      inquiryId: 0,
      accountNumber: '',
      productCode: '',
      amount: 0,
      refNumber: '',
      partnerId: apiKey,
    },
    status: {
      partnerId: apiKey,
      refNumber: '',
    },
  });

  const listVersion: any = [
    {
      id: '1.0',
      url: 'https://dev.openapi.ayopop.id/api/v1/bill/',
      value: '1.0',
    },
    {
      id: '2.0',
      url: 'https://dev.openapi.ayopop.id/api/v2/bill/',
      value: '2.0',
    },
  ];

  const headerBerar = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64');

  const payload: any = base64urlTest(
    JSON.stringify(params[selectTransaction.id]),
  );

  const fetchData = async (token: string, url: string) => {
    let myHeaders = new Headers();
    myHeaders.append('KEY', apiKey);
    myHeaders.append('TOKEN', token);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cache-Control', 'no-cache');
    myHeaders.append('VERSION', selectVersion.value);

    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return await fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setloading(false);

        return result;
      })
      .catch((error) => {
        setloading(false);

        console.log('error', error);
        return error;
      });
  };

  const handlerSubmit = async (e: any) => {
    e.preventDefault();

    let setUrl = selectVersion?.url + selectTransaction?.value;
    let token = JWT.encode(headerBerar, payload, secret);
    setloading(true);
    const data = await fetchData(token, setUrl);
    setresult(JSON.parse(data));
  };

  return (
    <div className="relative h-screen w-full bg-zinc-100">
      <div className="relative grid grid-cols-2 h-full">
        <div className="relative w-full h-full overflow-auto">
          {/* Section Form */}
          <h1 className="p-4 text-4xl font-semibold text-zinc-800">FORM POG</h1>
          <form
            onSubmit={handlerSubmit}
            className="relative grid gap-4  w-full bg-zinc-100 p-8 overflow-auto">
            <Checkbox
              dataBox={listVersion}
              defaultChecked={selectVersion}
              label="Version"
              description=""
              onChange={(e) => {
                setselectVersion(e);
              }}
            />

            <Checkbox
              dataBox={listTransaction}
              defaultChecked={selectTransaction}
              label="Choose Transaction"
              description=""
              onChange={(e) => {
                // settypeTransaction(e);
                setselectTransaction(e);
              }}
            />

            <div className="relative grid gap-6">
              {Object.entries(selectTransaction).length > 1 &&
                Object?.entries?.(params[selectTransaction?.id]).map(
                  ([key, value]: any) => {
                    return (
                      <div className="relative w-full" key={key}>
                        <label htmlFor={key} className="text-zinc-800">
                          {key}
                        </label>
                        <input
                          type="text"
                          name={key}
                          disabled={key === 'partnerId'}
                          id={key}
                          className="relative w-full rounded-lg p-4 bg-white text-zinc-800 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-zinc-200"
                          value={value}
                          onChange={(e) => {
                            setparams({
                              ...params,
                              [selectTransaction?.id]: {
                                ...params[selectTransaction?.id],
                                [key]: ['inquiryId', 'amount'].includes(key)
                                  ? +e.target.value
                                  : e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    );
                  },
                )}
            </div>

            <button
              disabled={loading}
              className=" disabled:bg-opacity-40 transition-all duration-300 relative px-4 py-2 rounded-md bg-blue-500 text-white">
              <span>Submit</span>
              {loading && '....'}
            </button>
          </form>
          <div className="relative w-1/2 p-4 -mt-8">
            <div className="relative text-green-500">
              <p className="font-semibold tracking-wide leading-relaxed">
                Request JSON
                <span
                  className="text-sm flex cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(params[selectTransaction.id], null, 2),
                    )
                  }>
                  <CopyIcon className="" height={24} width={24} />
                  Copy Request
                </span>
              </p>
              <pre>{JSON.stringify(params[selectTransaction.id], null, 2)}</pre>
            </div>
            <div className="relative text-blue-500 mt-4">
              <p className="font-semibold tracking-wide leading-relaxed">
                RESULT TOKEN
              </p>
              <p className="text-ellipsis flex flex-col gap-2 break-words pl-4 ">
                <span>{JWT.encode(headerBerar, payload, secret)}</span>
              </p>
            </div>
          </div>
        </div>
        {/* Section Result  */}
        <div className="relative h-full overflow-auto">
          <p className="sticky top-0 px-4 bg-blue-100 font-semibold z-10">
            Response
            <span
              className="text-sm flex cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(result, null, 2))
              }>
              <CopyIcon className="" height={24} width={24} />
              Copy Response
            </span>
          </p>

          <div className="relative h-full overflow-auto bg-gray-200 p-4">
            {loading ? (
              <div className="relative flex w-full h-full justify-center items-center">
                .....Loading
              </div>
            ) : (
              <pre className="text-zinc-800 font-medium">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

function base64urlTest(input: any) {
  return btoa(typeof input === 'string' ? input : JSON.stringify(input))
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const JWT = {
  encode(header: any, payload: any, secret: any) {
    const unsigned = [header, payload].join('.');
    const hash = sha256.hmac(secret, unsigned);
    const signature: any = Buffer.from(hash, 'hex')
      .toString('base64')
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    // .replace(/\+/g, '-')
    // // .replace(/\//g, '_')
    // .replace(/\=+$/m, '');

    return [unsigned, signature].join('.');
  },
};
