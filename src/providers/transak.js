// Transak handoff: build the hosted-checkout URL with wallet, amount, and asset prefilled.
// Docs: https://docs.transak.com/customization/query-parameters.md
// Staging host serves fake money with a staging key; production host needs a KYB-approved key.
export function transakReady(env) {
  return Boolean(env.TRANSAK_API_KEY);
}

export function transakUrl(env, { amount, currency, address, reference, origin }) {
  const host = env.TRANSAK_ENV === 'production' ? 'https://global.transak.com' : 'https://global-stg.transak.com';
  const p = new URLSearchParams({
    apiKey: env.TRANSAK_API_KEY,
    productsAvailed: 'BUY',
    cryptoCurrencyCode: 'BTC',
    network: 'mainnet',
    walletAddress: address,
    disableWalletAddressForm: 'true',
    fiatCurrency: currency,
    defaultFiatAmount: String(amount),
    partnerOrderId: reference,
    redirectURL: `${origin}/done?ref=${encodeURIComponent(reference)}`,
    themeColor: '0b57d0',
  });
  return `${host}/?${p.toString()}`;
}
