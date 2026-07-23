package Lista.ToDo.repository;

import Lista.ToDo.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Integer> {
}
