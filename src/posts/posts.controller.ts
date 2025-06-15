import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Post } from './posts.model';
import { createPostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { deletePostDto } from './dto/delete-post.dto';
import { setPostStatusDto } from './dto/set-post-status.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { FilterPostDto } from './dto/filter.dto';
import { GetPostDto } from './dto/get-post.dto';
import { AuditService } from 'src/audit-log/audit.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(
        private postsService: PostsService,
        private auditService: AuditService
    ) {}

    @ApiOperation({summary: "Create Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: createPostDto})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() userDto: createPostDto, @UploadedFile() image, @Req() request) {
        const item = await this.postsService.createPost(userDto,image);
        this.auditService.logAction(
            'create',
            'Post',
            item.id,
            null,
            item,
            request?.user?.id,
            request?.user
        );
        return item;
    }

    @ApiOperation({summary: "Get posts"})
    @ApiResponse({status: 200, type: [Object]})
    @Roles('Admin')
    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @ApiOperation({summary: "Get checked posts"})
    @ApiResponse({status: 200, type: [Object]})
    @Get('/getAllChecked')
    getAllCheckedPosts() {
        return this.postsService.getAllCheckedPosts();
    }

    @ApiOperation({summary: "Delete Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: deletePostDto})
    @Roles('Admin')
    @Post('/delete')
    async delete(@Body() dto: deletePostDto, @Req() request) {
        const item = await this.postsService.getOne(dto.id );
        const deleted = await this.postsService.deletePost(dto);
        this.auditService.logAction(
            'delete',
            'Post',
            item.id,
            item,
            null,
            request?.user?.id,
            request?.user
        );
        return deleted;
    }

    @ApiOperation({summary: "Set Post status"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: setPostStatusDto})
    @Roles('Admin', 'Driver')
    @Post('/setStatus')
    async setStatus(@Body() dto: setPostStatusDto, @Req() request) {
        const item = await this.postsService.setPostStatus(dto);
        this.auditService.logAction(
            'update',
            'Post',
            item.id,
            null,
            item,
            request?.user?.id,
            request?.user
        );
        return item;
    }

    @ApiOperation({summary: "Update Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: UpdatePostDto})
    @Roles('Admin', 'Driver')
    @Post('/update')
    async update(@Body() dto: UpdatePostDto, @Req() request) {
        const before = await this.postsService.getOne(dto.id);
        const item = await this.postsService.updatePost(dto);
        this.auditService.logAction(
            'update',
            'Post',
            item.id,
            before,
            item,
            request?.user?.id,
            request?.user
        );
        return item;
    }

    @ApiOperation({summary: "Get Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: GetPostDto})
    // @Roles('Admin', 'Driver')
    @Post('/getOne')
    getOne(@Body() dto: {id}) {
        return this.postsService.getOne(dto.id);
    }

    @ApiOperation({summary: "Get Post by Filter"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: FilterPostDto})
    // @Roles('Admin', 'Driver')
    @Post('/getFilteredPosts')
    getFiltered(@Body() dto: FilterPostDto) {
        return this.postsService.getFilteredPosts(dto);
    }

    @ApiOperation({summary: "Search Posts"})
    @ApiResponse({status: 200, type: Object})
    // @ApiBody({type: {value: string}})
    // @Roles('Admin', 'Driver')
    @Post('/search')
    search(@Body() dto: {value: string}) {
        return this.postsService.searchPosts(dto.value);
    }
}
