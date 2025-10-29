import urllib.request
for url in ['http://127.0.0.1:8000/', 'http://127.0.0.1:8000/usuarios/', 'http://127.0.0.1:8000/usuarios/clientes/']:
    try:
        r = urllib.request.urlopen(url)
        ct = r.getheader('Content-Type')
        data = r.read(1000)
        print('\nURL:', url)
        print('Content-Type header:', ct)
        print('First 400 bytes (repr):')
        print(repr(data[:400]))
    except Exception as e:
        print('\nError fetching URL', url, e)
