#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install nodejs -yq

WORKDIR /src
RUN git clone https://RiiVa:RiiVaDota39@github.com/RiiVa/Insmet-Lightning.git
COPY ["LightingProject/LightingProject.csproj", "LightingProject/"]
RUN dotnet restore "LightingProject/LightingProject.csproj"
COPY . .
WORKDIR "/src/LightingProject"
RUN dotnet build "LightingProject.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LightingProject.csproj" -c Release  -o /app/publish

FROM base AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 5000
EXPOSE 5001
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LightingProject.dll"]