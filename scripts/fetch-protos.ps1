$repoUrl = "https://github.com/Nest-Microservices-TCP/proto-files-p1.git" # URL del repositorio centralizado
$protoDirectory = "./proto"  # Directorio donde se guardarán los archivos .proto

# Clonamos el repositorio centralizado si no existe ya
if (!(Test-Path $protoDirectory)) {
    git clone $repoUrl $protoDirectory
} else {
    Write-Host "El repositorio ya ha sido clonado previamente."
    # Opcional: Actualiza el repositorio si ya está clonado
    cd $protoDirectory
    git pull
}

# Finaliza el proceso de bajada de archivos
Write-Host "Archivos .proto descargados en: $protoDirectory"
