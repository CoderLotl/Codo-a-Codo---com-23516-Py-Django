from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "core/index.html")

def acerca(request):
    return render(request, "core/acerca.html")

def contacto(request):
    return render(request, 'core/contacto.html')

def detalles(request):
    return render(request, 'core/detalles.html')

def explorar(request):
    return render(request, 'core/explorar.html')

def explorar_consola(request):
    return render(request, 'core/explorarConsola.html')