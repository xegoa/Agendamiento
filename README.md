Lógica del servicio

API Gateway
    ├── POST /crearCita     → Lambda Appointment
    ├── GET  /citasMedicas/{insuredId} → Lambda Appointment
    ↓
DynamoDB (citas, estado: pending/completed)
    ↓
SNS FIFO por país (SNSTopic_PE / SNSTopic_CL)
    ↓
SQS por país (SQS_PE / SQS_CL)
    ↓
Lambda PE / CL → simula guardar en MySQL RDS por país
    ↓
EventBridge → SQS_Confirm
    ↓
Lambda Appointment → actualiza estado a "completed"

## PASOS PARA EL USO

## A. Dependencias de Entorno

1. Instalar AWS Client en tu pc
    https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

2. Instalar AWS SAM CLI
    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

3. configurar una cuenta IAM
    https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users/details/dev?section=permissions

4. Instalar extension AWS Toolkit

5. Verificar version de nodejs v22^

6. Clonar el repositorio en su directorio de prefencia
    git clone url_girhub

7. npm instal en la raiz del proyecto

8. npm run build

9. click derecho sobre el archivo "api.yml" > "Open with infraestructure Composer"

10. click en la opcion "sincronizar" 
# seguido de los siguientes pasos--> 
    Specify Required parameters and save defaults
    (escoger region)
    "Nombre para el proyecto CloudFormation"
    "Create a SAM CLI managed S3 bucket"
    OK

11. en la extensión de AWS toolkit ir a la opcion de API Gateway/CitasAPI (####) | click derecho | copy url "o" invoke the cloud

12. End Points:
    crear cita
        https://tkqon0owc9.execute-api.us-east-1.amazonaws.com/Prod/crearCita (POST)
        body: {"insuredId":"00001","scheduleId":100,"countryISO":"PE"}
    Traer cita 
        https://tkqon0owc9.execute-api.us-east-1.amazonaws.com/Prod/citasMedicas?insuredId=00001 (GET)

## TESTEO / pruebas unitarias

1. npm run test desde la raiz del proyecto
