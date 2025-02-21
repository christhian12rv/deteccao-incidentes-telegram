echo "Verificando se o container do banco de dados está rodando..."
docker-compose ps db | grep "Up" > /dev/null
if [ $? -ne 0 ]; then
  echo "Banco de dados não está em execução! Iniciando o Docker..."
  docker-compose up -d db
  echo "Banco de dados iniciado."
else
  echo "Banco de dados já está em execução."
fi

echo "Aguardando o banco de dados ficar disponível..."
until docker exec deteccao-incidentes-telegram-postgres pg_isready -U postgres -d deteccao-incidentes -h db; do
  sleep 2
  echo "Banco de dados não está pronto ainda..."
done

echo "🚀 Rodando migrations..."
docker-compose exec app npx prisma migrate deploy
echo "Migrations aplicadas com sucesso!"