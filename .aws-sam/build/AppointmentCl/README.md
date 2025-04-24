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

## 1. Dependencias de Entorno
    
1. Clonar el repositorio en su directorio de prefencia
    git clone https://github.com/llcheoll/api-crm.git

2. Instalar AWS Client en tu pc
    https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3. Instalar AWS SAM CLI
    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

4. configurar una cuenta IAM
    https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users/details/dev?section=permissions
