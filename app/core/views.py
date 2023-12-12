from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Juego
from .models import Contacto
from django.views.decorators.csrf import csrf_exempt

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

def retornar_juegos(request):
    juegos = Juego.objects.all()
    
    juegos_list = list(juegos.values())
    
    return JsonResponse({"juegos": juegos_list})

@csrf_exempt
def enviar_contacto(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        email = data.get('email')
        mensaje = data.get('mensaje')   

        contacto = Contacto(nombre=nombre, email=email, mensaje=mensaje)
        contacto.save()
        return JsonResponse({'message': 'Contacto recibido'})