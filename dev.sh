echo "
Para instruções de setup:
-> setup_instructions

Se o seu setup já foi configurado: 
-> docker-compose up -d"

PROJ_BASE=$(pwd)
PROJECT="poc_nodejs_microservice"
DOCKER_VOLUME_DATA=$PROJ_BASE/docker/volumes/mysql
DUMP_FILE="$DOCKER_VOLUME_DATA/melhorescola_dump.sql"


function start_setup {
    prepare_dump_for_setup
    restore_database
  echo "
  Não esqueça de excluir os tokens do arquivo dev.sh.
  Seu setup foi finalizado e está pronto para uso.

  Para mais informações, confira a documentação oficial.

  Aplicação rodando em: http://localhost"
  
  }

  function prepare_dump_for_setup {
  until [ -d $PROJ_BASE/docker/volumes/mysql ]; do 
    echo awaiting mysql volume to be create in $DOCKER_VOLUME_DATA; sleep 1; 
  done
  
  echo "Insert the complete path of your dump .sql or .zip"
  read RECEIVED_PATH

  if [ -f $RECEIVED_PATH ]; then
    echo "File found, initializing database steps.."

    EXTENSION="${RECEIVED_PATH##*.}"

    if [ $EXTENSION = "zip" ]; then
      echo "Unziping file.."
      sudo unzip -oq $RECEIVED_PATH -d $DOCKER_VOLUME_DATA

      echo "Cheking if the extracted file exists.."

      if [ -f $DUMP_FILE ]; then
        echo "File exists.. calling restore_database to continue the setup steps"
      else
        echo "[Error] Extracted file not found in ($DOCKER_VOLUME_DATA). The name of the extracted file need to be melhorescola_dump.sql"
      fi
    fi

    if [ $EXTENSION = "sql" ]; then
      echo "Moving sql file to project docker volume folder ($DOCKER_VOLUME_DATA)"
      sudo mv $RECEIVED_PATH $DUMP_FILE
    fi
    
    return $?
  else
    echo "[ERROR] File not found."
  fi
}

function restore_database {
  echo "Initializing database restore."
  
  CD="$(pwd)"
  cd "$PROJ_BASE"

  echo "Subindo o container.."
  docker-compose up -d database
  
  echo "Running restore.."

  echo "The password is: melhorescola"
  docker exec -ti agme_mysql bash -c "mysql -u root -p melhorescola < /var/lib/mysql/melhorescola_dump.sql"

  echo "Deleting extracted dump file"
  sudo rm $DUMP_FILE

  exitcode=$?
  cd $CD

  return $exitcode
}

