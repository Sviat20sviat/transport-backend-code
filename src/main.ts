import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import { join } from "path";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // app.useStaticAssets(join('', '..', 'static'));
    const config = new DocumentBuilder().setTitle('transport-backend-docs').setDescription('Документация REST API проекта transport-backend').setVersion('1.0.0').addTag('Sviat20sviat').build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app, document);

    // app.useGlobalPipes(new ValidationPipe);

    await app.listen(PORT, () => {
        console.log('Server started on port ' + PORT,PORT);
    })
    
}

start()