import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"

@WebSocketGateway({ cors: true })
export class TransportGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server; 
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected!',);
            console.log('socket!',socket.id);
        })
    }

    // constructor(
    //     private server: Server 
    // ) {

    // }


    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log('CONSOLE!',body);

        this.server.emit('onMessage', {data: 'dsfsdfsdfsd'})
    }

    emit(eventName: EventNameEnum, data: any) {
        this.server.emit(eventName, data);
    }
}

export enum EventNameEnum {
    OnPostCreate = 'OnPostCreate',
    OnPostUpdate = 'OnPostUpdate',
    OnPostDelete = 'OnPostDelete'
}