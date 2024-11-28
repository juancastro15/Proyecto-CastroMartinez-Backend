import mongoose from "mongoose";
import { MONGO_URI } from "../../.env";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar con MongoDB", error);
    process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
  }
};

export default connectDB;
