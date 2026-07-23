package Lista.ToDo.service;

import Lista.ToDo.entity.ToDo;
import Lista.ToDo.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ToDoRepository todo;

    public List<ToDo> findAll(){
        return todo.findAll();
    }

    public ToDo findById(int id) {
        return todo.findById(id)
                .orElseThrow(() -> new RuntimeException("ToDo não encontrado"));
    }

    public ToDo create(ToDo toDo) {
        toDo.setDataCriacao(LocalDateTime.now());
        toDo.setDataUltimaAtualizacao(LocalDateTime.now());
        return todo.save(toDo);
    }

    public ToDo update(int id, ToDo novoToDo) {

        ToDo toDo = todo.findById(id)
                .orElseThrow(() -> new RuntimeException("ToDo não encontrado"));

        if (novoToDo.getTitulo() == null &&
                novoToDo.getDescricao() == null &&
                novoToDo.getStatus() == null) {
            throw new RuntimeException("Informe ao menos um dos campos: título, descrição ou status.");
        }

        if (novoToDo.getTitulo() != null) {
            toDo.setTitulo(novoToDo.getTitulo());
        }

        if (novoToDo.getDescricao() != null) {
            toDo.setDescricao(novoToDo.getDescricao());
        }

        if (novoToDo.getStatus() != null) {
            toDo.setStatus(novoToDo.getStatus());
        }


        return todo.save(toDo);
    }

    public void delete(int id) {

        if (!todo.existsById(id)) {
            throw new RuntimeException("ToDo não encontrado");
        }

        todo.deleteById(id);

    }

}
