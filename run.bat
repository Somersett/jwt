@echo off
:: ============================================================
::  JWT Cookies Demo — Ejecutar con doble clic
:: ============================================================
title JWT Cookies Demo

echo.
echo  Iniciando JWT + Cookies Demo...
echo  ================================
echo.

PowerShell -ExecutionPolicy Bypass -File "%~dp0run.ps1"
pause
