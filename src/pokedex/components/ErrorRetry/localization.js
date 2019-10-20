const defaultLang = {
  NoInternetConnection: 'No Internet Connection',
  NoInternetConnectivity: 'Sorry, no internet connectivity detected.',
  tryAgain: 'Please reconnect and try again.',
  GenericError: 'Oops, something went wrong! Please try again.',
  retry: 'Retry'
};

const constants = {
  en: {
    ...defaultLang
  },
  hi: {
    ...defaultLang,
    NoInternetConnection: 'कोई इंटरनेट कनेक्शन नहीं है',
    NoInternetConnectivity: 'क्षमा करें, कोई इंटरनेट कनेक्शन नहीं मिला।',
    tryAgain: 'कृपया दोबारा कनेक्ट करके फिर से कोशिश करें।',
    GenericError: 'ओह, कुछ समस्या हुई है! कृपया दोबारा कोशिश करें।',
    retry: 'दोबारा कोशिश करें'
  }
};

const language = 'en';

export default constants[language];
