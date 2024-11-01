import { Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CheckTokenAuthGuard } from "src/infrastructure/guards/dubl-guards/check-refresh-token.guard";
import { SessionsService } from "../application/session.service";
import { SessionsQueryRepository } from "../repository/session.sql.query-repository";

@Controller('security')
export class SessionController {
    constructor(
        protected sessionsService: SessionsService,
        protected sessionsQueryRepository: SessionsQueryRepository,
    ) {}
    
    @UseGuards(CheckTokenAuthGuard)
    @Get('/devices')
    async getAllSessions(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const sessions = await this.sessionsQueryRepository.findSessions(req.user!.userId);
            return sessions;
    }

    @UseGuards(CheckTokenAuthGuard)
    @Delete('/devices')
    @HttpCode(204)
    async deleteAllSessionsExceptCurrentOne(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const userId = req.user!.userId;
            const device_id = req.deviceId;
            if(!device_id) throw new UnauthorizedException()

            const result = await this.sessionsService.deleteAllSessionsExceptCurrentOne(userId, device_id);
            return result;
    }

    @UseGuards(CheckTokenAuthGuard)
    @Delete('/devices/:id')
    @HttpCode(204)
    async deleteSessionsById(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const findSession = await this.sessionsService.findUserByDeviceId(id);
            if (!findSession) {
                throw new NotFoundException();
            } else {
                if (req.user?.userId !== findSession.user_id) {
                    throw new ForbiddenException();
                }
            }

        const deleteDevice = await this.sessionsService.deleteSessionById(id);
            if (!deleteDevice) {
                throw new NotFoundException();
            }
            return deleteDevice;
    }
}