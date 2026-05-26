# ============================================================
#  JWT Cookies Demo - Script de arranque automatico
#  Detecta JDK 21, descarga Maven si falta y ejecuta el JAR
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   JWT + COOKIES DEMO - Iniciando servidor...   " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# --- 1. Configurar JAVA_HOME ---
$jdkPaths = @(
    "C:\minecraft-server\jdk-21.0.7-lite",
    "C:\minecraft-server-1.20.1-MohistMC\jdk-21.0.7-lite",
    $env:JAVA_HOME,
    "C:\Program Files\Eclipse Adoptium\jdk-21.0.7.6-hotspot",
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Java\jdk-17"
)

$javaHome = $null
foreach ($path in $jdkPaths) {
    if ($path -and (Test-Path "$path\bin\java.exe")) {
        $javaHome = $path
        break
    }
}

if (-not $javaHome) {
    Write-Host "[ERROR] No se encontro JDK 17+." -ForegroundColor Red
    Write-Host "Descarga JDK 21 desde: https://adoptium.net/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para cerrar"
    exit 1
}

$env:JAVA_HOME = $javaHome
$env:PATH      = "$javaHome\bin;$env:PATH"
Write-Host "[OK] Java: $javaHome" -ForegroundColor Green

# --- 2. Localizar o descargar Maven ---
$mavenSearch = Get-ChildItem "$env:USERPROFILE\.m2" -Filter "apache-maven-*" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
if ($mavenSearch) {
    $mavenHome = $mavenSearch.FullName
} else {
    $mavenHome = "$env:USERPROFILE\.m2\apache-maven-3.9.6"
}
$mvnCmd = "$mavenHome\bin\mvn.cmd"

if (-not (Test-Path $mvnCmd)) {
    Write-Host ""
    Write-Host "Maven no encontrado. Descargando Apache Maven 3.9.6..." -ForegroundColor Yellow
    $mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
    $zipPath  = "$env:TEMP\apache-maven-3.9.6-bin.zip"
    try {
        Invoke-WebRequest -Uri $mavenUrl -OutFile $zipPath -UseBasicParsing
        Expand-Archive -Path $zipPath -DestinationPath "$env:USERPROFILE\.m2" -Force
        Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
        $mavenSearch = Get-ChildItem "$env:USERPROFILE\.m2" -Filter "apache-maven-*" -Directory | Select-Object -First 1
        $mavenHome = $mavenSearch.FullName
        $mvnCmd    = "$mavenHome\bin\mvn.cmd"
        Write-Host "[OK] Maven instalado: $mavenHome" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] No se pudo descargar Maven: $_" -ForegroundColor Red
        Read-Host "Presiona Enter para cerrar"
        exit 1
    }
}

Write-Host "[OK] Maven: $mavenHome" -ForegroundColor Green

# --- 3. Compilar si el JAR no existe ---
$jarPath = "$PSScriptRoot\backend\target\jwt-cookies-demo-1.0.0.jar"

if (-not (Test-Path $jarPath)) {
    Write-Host ""
    Write-Host "Compilando el proyecto (primera vez, puede tardar ~1 minuto)..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\backend"
    & $mvnCmd package -DskipTests "-Djava.home=$javaHome" 2>&1 | Where-Object { $_ -like "*BUILD*" -or $_ -like "*ERROR*" }
    if (-not (Test-Path $jarPath)) {
        Write-Host "[ERROR] La compilacion fallo." -ForegroundColor Red
        Read-Host "Presiona Enter para cerrar"
        exit 1
    }
    Write-Host "[OK] Compilacion exitosa." -ForegroundColor Green
}

# --- 4. Iniciar el servidor ---
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   URL:          http://localhost:8080           " -ForegroundColor White
Write-Host "   Usuario:      admin                           " -ForegroundColor White
Write-Host "   Contrasena:   123456                          " -ForegroundColor White
Write-Host "   Parar:        Ctrl + C                        " -ForegroundColor DarkGray
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "$PSScriptRoot\backend"
& "$javaHome\bin\java.exe" -jar $jarPath