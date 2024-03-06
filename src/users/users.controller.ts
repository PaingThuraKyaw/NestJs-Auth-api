import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

interface userProp {
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER') {
    return role;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This is right ${id}`;
  }

  @Post()
  create(@Body() user: userProp) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: userProp) {
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This user delete ${id} `;
  }
}
