import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(
        private postsService: PostsService
    ) {}

    @ApiOperation({summary: "Create Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: createPostDto})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() userDto: createPostDto, @UploadedFile() image) {
        return this.postsService.createPost(userDto,image);
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
    delete(@Body() dto: deletePostDto) {
        return this.postsService.deletePost(dto);
    }

    @ApiOperation({summary: "Set Post status"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: setPostStatusDto})
    @Roles('Admin', 'Driver')
    @Post('/setStatus')
    setStatus(@Body() dto: setPostStatusDto) {
        return this.postsService.setPostStatus(dto);
    }

    @ApiOperation({summary: "Update Post"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: UpdatePostDto})
    @Roles('Admin', 'Driver')
    @Post('/update')
    update(@Body() dto: UpdatePostDto) {
        return this.postsService.updatePost(dto);
    }

    @ApiOperation({summary: "Get Post"})
    @ApiResponse({status: 200, type: Object})
    // @ApiBody({type: string})
    // @Roles('Admin', 'Driver')
    @Post('/getOne')
    getOne(@Body() dto: {id}) {
        return this.postsService.getOne(dto.id);
    }

    @ApiOperation({summary: "Get Post by Filter"})
    @ApiResponse({status: 200, type: Object})
    // @ApiBody({type: string})
    // @Roles('Admin', 'Driver')
    @Post('/getFilteredPosts')
    getFiltered(@Body() dto: FilterPostDto) {
        return this.postsService.getFilteredPosts(dto);
    }
}
