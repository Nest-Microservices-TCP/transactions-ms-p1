# Verifica que el directorio de salida existe
if (!(Test-Path "./src/grpc")) {
    New-Item -ItemType Directory -Path "./src/grpc" | Out-Null
}

# Ejecuta el comando para compilar los archivos .proto
# NOTA: El script es de powershell, pero solo funciona
# ejecutándolo en GitBash o un entorno Unix, debido al
# comanda 'find'
protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" `
    --ts_proto_out=./src/grpc `
    --ts_proto_opt=stringEnums=true `
    --ts_proto_opt=nestJs=true `
    --ts_proto_opt=snakeToCamel=false `
    --ts_proto_opt=fileSuffix=.pb `
    --ts_proto_opt=useDate=true `
    --ts_proto_opt=addGrpcMetadata=true `
    --ts_proto_opt=unrecognizedEnum=false `
    --proto_path=proto-files `
    $(find proto-files -name "*.proto")
