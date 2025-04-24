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
